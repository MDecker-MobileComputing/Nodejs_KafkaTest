
const { Kafka, logLevel } = require("kafkajs");

const kafka = new Kafka({ brokers: [ "localhost:9092" ],
                          clientId: "nodejs-kafka-sender",
                          logLevel: logLevel.ERROR
                        });
/*
const kafka = new Kafka({
    clientId: 'nodejs-kafka-sender',
    brokers: ['zimolong.eu:9092'],
    sasl: {
        mechanism: 'plain',
        username: 'alice',
        password: 's3cr3t'
    },
    ssl: false, // Disabling SSL as you're using SASL_PLAINTEXT
    connectionTimeout: 1000,
    authenticationTimeout: 1000,
    logLevel: logLevel.ERROR,
});
*/

const konsument = kafka.consumer({ groupId: "test-gruppe" });

const asyncBlock = async () => {

    await konsument.connect();
    await konsument.subscribe({ topic: "Dozent.Mustermann.KafkaJsTestTopic",
                                fromBeginning: true });

    await konsument.run({

        eachMessage: async ({ topic, partition, message }) => {

          console.log( `Nachricht empfangen: ${message.value}` );
        },
    });

    console.log("Warte auf Nachrichten ...\n");
};

asyncBlock().catch(console.error);
