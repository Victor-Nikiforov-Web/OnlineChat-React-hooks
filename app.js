const express = require('express');
const io = require("socket.io");
const server = express();

const expressListener = server.listen(process.env.PORT || 3000, () => console.log("Server is on"));
const socketServer = io(expressListener);

server.use(express.static("build"));

server.get("*", (request, response) => {
  response.sendFile(path.join(__dirname, "build", "index.html"));
});
socketServer.sockets.on("connection", socket => {
    socket.on("msg-from-client", msg => {
        socketServer.sockets.emit("msg-from-server", msg);
    });
});
