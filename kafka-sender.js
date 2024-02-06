
// Konfigurationsdatei ".env" laden
require("dotenv").config();


if (!process.env.KAFKA_TOPIC) {

    console.error("Kafka-Topic nicht konfiguriert. Bitte Datei '.env' prüfen.");
    process.exit(1);
}

console.log("Versuche, Nachricht auf das folgende Kafka-Topic zu schreiben: " + process.env.KAFKA_TOPIC);


