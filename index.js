const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var spots = [null, null]

app.use(express.static("public"))

io.on('connection', (socket) => {
  socket.on('Game Board', (board, gmoves, gPiece, color) => {
    io.emit('Game Board', board, gmoves, gPiece, color);
  });

  socket.on('color', () => {
    if (!spots[0]){
      spots[0] = 1
      var color = "white"
    } else if (!spots[1]) {
      spots[1] = 1
      var color = "black"
    } else {
      var color = "spectator"
    }

    console.log(spots)
    socket.emit("color", "white")
  })
  
});

const PORT = process.env.PORT || 8080
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});