
// Konfigurationsdatei ".env" laden
require("dotenv").config();


if (!process.env.KAFKA_TOPIC_NAME) {

    console.error("Kafka-Topic nicht konfiguriert. Bitte Datei '.env' prüfen.");
    process.exit(1);
}

console.log("Topic: " + process.env.KAFKA_TOPIC_NAME);
