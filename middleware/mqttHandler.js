const mqtt = require("mqtt");

const connectMqttBroker = (protocol, host, port, topics, onMessageCallback, username, password) => {
    const client = mqtt.connect({
        protocol: protocol,
        host: host,
        port: port,
        username: username,
        password: password,
    });

    client.on("connect", () => {
        console.log(`Connected to MQTT cluster at ${host}:${port}`);

        topics.forEach(topic => {
            client.subscribe(topic);
        });
    });

    client.on("error", (error) => {
        console.error(`Error connecting to MQTT cluster at ${host}:${port}: ${error}`);
    });

    client.on("close", () => {
        console.log(`Disconnected from MQTT cluster at ${host}:${port}`);
    });

    client.on("offline", () => {
        console.log(`MQTT client is offline`);
    });

    client.on("message", (mqttTopic, message) => {
        onMessageCallback(mqttTopic, message);
    });

    return client;
};

module.exports = connectMqttBroker;
