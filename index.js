const express = require("express");
const cors = require("cors");

require("dotenv").config();
const path = require("path");
const connectDB = require("./src/config/db");
const userRoutes = require('./src/routes/userRoutes')
const errorMiddleware =require('./src/middlewares/errorHandler')
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);

app.use(errorMiddleware);

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
