const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/db_connection");
const dotenv = require("dotenv").config();
const cors = require("cors");

connectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors({origin: 'http://localhost:5001'}));
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});