const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/db_connection");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectMqttBroker = require("./middleware/mqttHandler");

const mqttProtocol = process.env.MQTT_PROTOCOL;
const mqttHost = process.env.MQTT_HOST;
const mqttPort = process.env.MQTT_PORT;
const mqttTopics = ["eregulation/arduino", "eregulation/web"];
const mqttUsername = process.env.MQTT_USERNAME;
const mqttPassword = process.env.MQTT_PASSWORD;

connectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors({origin: process.env.FRONT_URL}));
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const onMQTTMessage = (mqttTopic, message) => {
    const receivedMessage = message.toString();
    console.log(`Received message from HiveMQ MQTT: ${receivedMessage}`);

    if (receivedMessage === "on") {
        console.log("Sending API call...");
    }
};

connectMqttBroker(mqttProtocol, mqttHost, mqttPort, mqttTopics, onMQTTMessage, mqttUsername, mqttPassword);
