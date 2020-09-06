const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
require("dotenv/config");

// Mongoose

const mongoose = require("mongoose");

// DB im connecting to

const url = process.env.DB_CONNECTION;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

// Check if connection works or not

const db = mongoose.connection;
db.once("open", (_) => {
  console.log("Database connected:", url);
});

db.on("error", (err) => {
  console.error("connection error:", err);
});

// Mongoose disconnection function, gets called when the app terminates
const mongooseShutdown = (message, cb) => {
  db.close(() => {
    console.log(`Mongoose disconnection through ${message}`);
    cb();
  });
};

// When nodemon restarts

process.once("SIGUSR2", () => {
  mongooseShutdown("nodemon restart", () => {
    process.kill(process.pid, "SIGUSR2");
  });
});

//When app stops running
process.on("SIGINT", () => {
  mongooseShutdown("app termination", () => {
    process.exit(0);
  });
});

// Declare routes here

const postsRouter = require("./Posts/postsRouter");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(bodyParser.json());

// Use routes
server.use("/api/posts", postsRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "all working" });
});

// Custom middleware
server.use((err, req, res, next) => {
  res.status(500).json({
    message: "Something went wrong",
  });
});

module.exports = server;
