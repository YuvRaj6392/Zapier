docker run -p 9092:9092 apache/kafka:3.7.1

## Create a topic
./kafka-topics.sh --create --topic zap-events --bootstrap-server localhost:9092

## Write some events in the topic
./kafka-console-producer.sh --topic zap-events --bootstrap-server localhost:9092

## Consume a topic
./kafka-console-consumer.sh --topic zap-events --from-beginning --bootstrap-server localhost:9092