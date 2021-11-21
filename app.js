//env file
require("dotenv").config();

//imports
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const User = require("./models/user");

//create the server
const app = express();

//import the routes
const login = require("./routes/login");
const signup = require("./routes/signup");
const driver = require("./routes/driver");

//middlewares
app.use(cors());
app.use(express.json());

//mongoose
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//routes
app.get("/", (req, res) => {
  res.send("yes listening");
});
app.use("/login", login);
app.use("/signup", signup);
app.use("/getDriver", driver);

//start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`listening at ${PORT}`);
});
