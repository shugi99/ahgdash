const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const HttpError = require("./config/http-error");

const countRoutes = require("./routes/count-routes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Route
app.use("/api/count", countRoutes);

// Handle errors
app.use((req, res, next) => {
  const error = new HttpError("Not found", 404);
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error: error.message || "An unknown error occured!" });
});

const port = process.env.PORT || 5000;

//Socket
const http = require("http").createServer(app);
const io = require("socket.io")(http, { cors: { origin: "*" } });

io.on("connection", (socket) => {});

const rentalBeeDB = mongoose.createConnection(
  `${process.env.RENTAL_BEE_DB_URI}`
);

const entaDB = mongoose.createConnection(`${process.env.ENTA_DB_URI}`);

rentalBeeDB.once("open", () => {
  console.log("MongoDBdatabase");
  const listingChangeStream = rentalBeeDB.collection("listings").watch();
  const propertyChangeStream = rentalBeeDB.collection("properties").watch();
  const userChangeStream = rentalBeeDB.collection("users").watch();

  listingChangeStream.on("change", (change) => {
    const getListings = async () => {
      const res = await rentalBeeDB.collection("listings").countDocuments();
      io.emit("rbListings", res);
    };
    getListings();
  });
  propertyChangeStream.on("change", (change) => {
    const getProperties = async () => {
      const res = await rentalBeeDB.collection("properties").countDocuments();
      io.emit("rbProperties", res);
    };
    getProperties();
  });
  userChangeStream.on("change", (change) => {
    const getUsers = async () => {
      const res = await rentalBeeDB.collection("users").countDocuments();
      io.emit("rbUsers", res);
    };
    getUsers();
  });
});

entaDB.once("open", () => {
  const listingChangeStream = entaDB.collection("listings").watch();
  const userChangeStream = entaDB.collection("users").watch();

  listingChangeStream.on("change", (change) => {
    const getListings = async () => {
      const res = await entaDB.collection("listings").countDocuments();
      io.emit("entaListings", res);
    };
    getListings();
  });
  userChangeStream.on("change", (change) => {
    const getUsers = async () => {
      const res = await entaDB.collection("user").countDocuments();
      io.emit("entaUsers", res);
    };
    getUsers();
  });
});

try {
  http.listen(port);
  console.log(mongoose.connections.length, "DBs connected");
} catch (error) {
  console.log(error);
}
