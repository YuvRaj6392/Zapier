import { Kafka } from "kafkajs";
import { PrismaClient } from "@prisma/client";
import { JsonObject } from "@prisma/client/runtime/library";

const prismaClient=new PrismaClient();

const TOPIC_NAME = "zap-events";

const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["localhost:9092"],
});

async function main() {
  const consumer = kafka.consumer({
    groupId: "main-worker",
  });

  await consumer.connect();

  const producer =  kafka.producer();

  await producer.connect();

  await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true });
  await consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value?.toString(),
      });
      if(!message.value?.toString()){
        return;
      }
      const parsedValue=JSON.parse(message.value?.toString());
      const zapRunId= parsedValue.zapRunId;
      const stage=parsedValue.stage;
      const zapRunDetails=await prismaClient.zapRun.findFirst({
        where:{
          id:zapRunId
        },
        include:{
          zap:{
            include:{
              actions:{
                include:{
                  type:true
                }
              }
            }
          }
        }
      })
      const currentAction=zapRunDetails?.zap.actions.find(x=>x.sortingOrder ===  stage)

      if(!currentAction){
        console.log('Current action not found')
        return;
      }
      
      if(currentAction.type.id==='email'){
        console.log('Sending out an email')
        const body=(currentAction.metadata as JsonObject)?.body;
        const to=(currentAction.metadata as JsonObject)?.email;
        const zapRunMetadata=zapRunDetails?.metadata;
        
      }

      if(currentAction.type.id==='send-sol'){
        console.log('Sending out solana')
        //parse out the address and the amount to send
      }

      await new Promise((r) => setTimeout(r, 500));

      const zapId= message?.value?.toString();
      
      const lastStage= (zapRunDetails?.zap.actions?.length || 1) - 1;

      if(lastStage!==stage){
        await producer.send({
            topic: TOPIC_NAME,
            messages:[{
              value: JSON.stringify({ 
                stage : stage + 1,
                zapRunId
               })
            }]
        })
      }

      console.log('processing done')
      //you can do your action operation here!

      //
      await consumer.commitOffsets([{
        topic:TOPIC_NAME,
        partition:partition,
        offset: (parseInt(message.offset)+1).toString()
      }])

    },
  });
}

main();


//worker will consume the kafka topic and carry out actions accordingly