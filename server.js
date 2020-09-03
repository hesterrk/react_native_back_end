const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// Mongoose

const mongoose = require("mongoose");

// database im connecting to

const url = "mongodb://127.0.0.1:27017/reactnativeinsta";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

// Check if connection works or not

const db = mongoose.connection;
db.once("open", (_) => {
  console.log("Database connected:", url);
});

db.on("error", (err) => {
  console.error("connection error:", err);
});

// Declare routes here

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

// Use routes

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
