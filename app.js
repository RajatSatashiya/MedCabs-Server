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
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost/3000",
    methods: ["GET", "POST"],
  },
});

//import the routes
const login = require("./routes/login");
const signup = require("./routes/signup");
const driver = require("./routes/driver");
const rides = require("./routes/rides");
const faq = require("./routes/faq");

//middlewares
app.use(cors());
app.use(express.json());

//mongoose
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connected");
  });

//routes
app.get("/", (req, res) => {
  res.send("yes listening");
});
app.use("/login", login);
app.use("/signup", signup);
app.use("/getDriver", driver);
app.use("/rides", rides);
app.use("/faq", faq);

//findUser function
var findUser = async (decodedId) => {
  const user = await User.find({ _id: decodedId });
  const username = user[0].name;
  return await username;
};

//socket io
var roomJoin;
io.on("connection", (socket) => {
  console.log("new socket connection");

  socket.on("join", ({ room }) => {
    roomJoin = room;
    console.log(roomJoin);
    socket.join(roomJoin);
  });
  socket.on("disconnect", () => {
    console.log("user left");
  });
  socket.on("sendMessage", async ({ message, token }) => {
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await findUser(decoded);
    io.to(roomJoin).emit("message", { user: user, text: message });
  });
});

//start the server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`listening at ${PORT}`);
});
