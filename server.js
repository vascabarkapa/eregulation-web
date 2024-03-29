const express = require("express");
const cronJob = require("./config/cronjob");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/db_connection");
const dotenv = require("dotenv").config();
const cors = require("cors");
const MqttHandler = require("./middleware/mqttHandler");

connectDb();

const mqttHandler = MqttHandler.getInstance();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors({origin: process.env.FRONT_URL}));
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/data", require("./routes/dataRoutes"));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
