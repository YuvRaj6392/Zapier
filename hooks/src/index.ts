import express from "express";
const app = express();
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

app.use(express.json())

//https://hooks.zapier.com/hooks/catch/19896975/26gxnc2/
//password logic

app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
  const userId = req.params.userId;
  const zapId = req.params.zapId;
  const body=req.body;

  //store in db a new trigger
  await client.$transaction(async (tx) => {
    const run = await tx.zapRun.create({
      data: {
        zapId: zapId,
        metadata:body
      },
    });
    await tx.zapRunOutbox.create({
      data:{
        zapRunId:run.id
      }
    })
  });

  res.json({
    msg:'webhook received'
  })

  //push it in to a queue (kafka/redis)
});

app.listen(3002,()=>{
  console.log('server is listening at 3002')
})