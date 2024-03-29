const express = require("express");

const app = express();
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

app.use(cors());
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join_room", (roomid) => {
    socket.join(roomid);
    console.log(`user connection id is ${socket.id} and room id is ${roomid}`);
  });

  socket.on("send_message", (dataObj) => {
    socket.to(dataObj.roomId).emit("recived_message", dataObj);
  });

  socket.on("disconnect", () => {
    console.log("user is offline");
  });
});
server.listen(3001, () => {
  console.log("server is running on port 3001");
});
