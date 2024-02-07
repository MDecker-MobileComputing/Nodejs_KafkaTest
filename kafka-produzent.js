
// Konfigurationsdatei ".env" laden
require("dotenv").config();


if (!process.env.KAFKA_TOPIC) {

    console.error("Kafka-Topic nicht konfiguriert. Bitte Datei '.env' prüfen.");
    process.exit(1);
}

console.log("Versuche, Nachricht auf das folgende Kafka-Topic zu schreiben: " + process.env.KAFKA_TOPIC);


// write message to Kafka topic
const { Kafka } = require("kafkajs");

const kafka = new Kafka({ brokers: [ "localhost:9092" ], clientId: "nodejs-kafka-sender" });

const producer = kafka.producer();


const asyncBlock = async () => {

    await producer.connect();
    await producer.send({
                    topic: process.env.KAFKA_TOPIC,
                    messages: [{ value: "Hallo KafkaJS!" }]
    });

    console.log("Nachricht wurde erfolgreich gesendet.");

};

asyncBlock().catch(console.error);