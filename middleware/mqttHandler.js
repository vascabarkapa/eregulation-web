const mqtt = require("mqtt");

class MqttHandler {
    constructor() {
        const protocol = process.env.MQTT_PROTOCOL;
        const host = process.env.MQTT_HOST;
        const port = process.env.MQTT_PORT;
        const username = process.env.MQTT_USERNAME;
        const password = process.env.MQTT_PASSWORD;

        const options = {
            protocol: protocol,
            host: host,
            port: port,
            username: username,
            password: password,
        };

        this.client = mqtt.connect(options);

        this.client.on("connect", () => {
            console.log(`Connected to MQTT cluster at ${host}:${port}`);
            this.subscribeToTopics();
        });

        this.client.on("error", (error) => {
            console.error(`Error connecting to MQTT cluster at ${host}:${port}: ${error}`);
        });

        this.client.on("close", () => {
            console.log(`Disconnected from MQTT cluster at ${host}:${port}`);
        });

        this.client.on("offline", () => {
            console.log(`MQTT client is offline`);
        });

        this.client.on("message", (topic, message) => {
            this.handleIncomingMessage(topic, message.toString());
        });
    }

    subscribeToTopics() {
        this.client.subscribe("eregulation/web");
    }

    handleIncomingMessage(topic, message) {
        console.log(`Received message on topic ${topic}: ${message}`);
    }

    sendMessage(topic, payload) {
        this.client.publish(topic, payload);
        console.log(`Sent message on topic ${topic}: ${payload}`);
    }
}

module.exports = MqttHandler;