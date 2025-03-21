import { Kafka, logLevel } from "kafkajs";


const kafka = new Kafka({ brokers: [ "localhost:9092" ],
                          clientId: "nodejs-kafka-sender",
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


const producer = kafka.producer();

const nachricht = "Diese Nachricht wurde mit Kafkajs erzeugt am/um " + (new Date()).toISOString();

const asyncBlock = async () => {

    const nachrichtObjekt = {
        //key: "mein-schluesselwert",
        value: nachricht
    };

    await producer.connect();
    await producer.send({
                    topic: "Dozent.Mustermann.KafkaJsTestTopic", // Darf keine Umlaute enthalten!
                    messages: [ nachrichtObjekt ]
    });

    console.log("\nDie folgende Nachricht wurde gesendet: " + nachricht + "\n");
    await producer.disconnect();
};

asyncBlock().catch( console.error );
