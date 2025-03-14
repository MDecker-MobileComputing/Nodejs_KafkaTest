import { Kafka, logLevel } from "kafkajs";


const kafka = new Kafka({ brokers: [ "localhost:9092" ],
                          clientId: "nodejs-kafka-topic-erzeuger",
                          logLevel: logLevel.ERROR
                        });


const admin = kafka.admin();

const run = async () => {

    await admin.connect();

    await admin.createTopics({
      topics: [{
        topic: "Dozent.MaxMustermann.CustomTopic", // darf keine Umlaute enthalten!
        numPartitions: 2,
        replicationFactor: 1,
        configEntries: [
            { name: "retention.ms", value: "-1"}
        ]
      }],
    });

    await admin.disconnect();
  }

  run().catch( console.error );
