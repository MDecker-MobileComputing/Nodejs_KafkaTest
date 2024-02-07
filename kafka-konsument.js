
// Konfigurationsdatei ".env" laden
require("dotenv").config();


if (!process.env.KAFKA_TOPIC) {

    console.error("Kafka-Topic nicht konfiguriert. Bitte Datei '.env' prüfen.");
    process.exit(1);
}


// write message to Kafka topic
const { Kafka, logLevel } = require("kafkajs");

const kafka = new Kafka({ brokers: [ "localhost:9092" ],
                          clientId: "nodejs-kafka-sender",
                          logLevel: logLevel.ERROR });

const konsument = kafka.consumer({ groupId: "test-gruppe" });

const asyncBlock = async () => {

    await konsument.connect();
    await konsument.subscribe({ topic: process.env.KAFKA_TOPIC, fromBeginning: true });

    await konsument.run({
        eachMessage: async ({ topic, partition, message }) => {
          console.log( `Nachricht empfangen: ${message.value.toString()}` );
        },
    });

    console.log("Warte auf (alle) Nachrichten vom Topic: " + process.env.KAFKA_TOPIC);
};

asyncBlock().catch(console.error);
