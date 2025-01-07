const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const path = require("path");
const connectDB = require("./src/config/db");
const userRoutes = require('./src/routes/userRoutes')
const depositRoutes = require('./src/routes/depositRoutes')
const withdrawRoutes = require('./src/routes/withdrawRoutes')
const supportRoutes = require('./src/routes/supportRoutes')
const dashboardRoutes = require('./src/routes/dashboardRoutes')
const peymentRoutes = require('./src/routes/peymentRoutes')
const gameRoutes = require('./src/routes/gameRoutes')
const errorMiddleware =require('./src/middlewares/errorHandler')
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
      origin: ["http://localhost:5173","http://localhost:5174","https://cas-ino.web.app",""],
      credentials: true,
    })
  );

  app.post("/jwt", (req, res) => {
    const user = req.body;
    const token = jwt.sign(user, process.env.DB_SECRET);
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      })
      .send({ success: true });
  });

  app.post("/logout", async (req, res) => {
    const user = req.body;
    res.clearCookie("token", { maxAge: 0 }).send({ success: true });
  });







app.use("/users", userRoutes);
app.use("/deposit", depositRoutes);
app.use("/withdraw", withdrawRoutes);
app.use('/supports', supportRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/peyment',peymentRoutes);
app.use('/game',gameRoutes);
app.use(errorMiddleware);

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
