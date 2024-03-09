const { Kafka, logLevel } = require("kafkajs");

/*
const kafka = new Kafka({ brokers: [ "localhost:9092" ],
                          clientId: "nodejs-kafka-liste",
                          logLevel: logLevel.ERROR
                        });
*/                        


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



const admin = kafka.admin();

const run = async () => {

    await admin.connect();

    const stringArrayOfTopics = await admin.listTopics();

    console.log(`\nAnzahl Topics gefunden: ${stringArrayOfTopics.length}\n`);

    // alle Topics in alphabetischer Reihenfolge ausgeben
    stringArrayOfTopics.sort();
    for (let topic of stringArrayOfTopics) {

        console.log(`Topic: ${topic}`);
    }
    console.log();

    await admin.disconnect();
}

run().catch( console.error );
