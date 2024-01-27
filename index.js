const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const http = require("http");
const expressServer = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(expressServer);
const path = require("path");

app.use(cors());

app.use(express.static("swift-chat-client/dist"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "swift-chat-client/dist/index.html"));
});

io.on("connection", (socket) => {
  console.log("New user connected");
  
  socket.on("sendMsg", (data) => {
    console.log(data);
    socket.broadcast.emit("brodcast", data);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

expressServer.listen(port, () => {
  console.log(`SwiftChat server is running on port : ${port}`);
});
