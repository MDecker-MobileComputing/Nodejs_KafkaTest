const { Kafka, logLevel } = require("kafkajs");


const kafka = new Kafka({ brokers: [ "localhost:9092" ],
                          clientId: "nodejs-kafka-liste",
                          logLevel: logLevel.ERROR
                        });

/*
const kafka = new Kafka({
    clientId: "nodejs-kafka-sender",
    brokers: ["zimolong.eu:9092"],
    sasl: {
        mechanism: "plain",
        username: "alice",
        password: "g3h3im"
    },
    ssl: false, // Disabling SSL as you're using SASL_PLAINTEXT
    connectionTimeout: 1000,
    authenticationTimeout: 1000,
    logLevel: logLevel.ERROR,
});
*/



const admin = kafka.admin();

const run = async () => {

    await admin.connect();

    await admin.createTopics({
      topics: [{
        topic: "Dozent.MaxMustermann.CustomTopic",
        numPartitions: 2,
        replicationFactor: 1, // Replikationsfaktor 1, da nur ein Broker
        configEntries: [
            { name: "retention.ms", value: "-1"} // unendlich lange Speichern
        ]
      }],
    });

    await admin.disconnect();
  }
  
  run().catch( console.error );
