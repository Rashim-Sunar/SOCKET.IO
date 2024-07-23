/*
Room
--> A room is an arbitary channel that sockets can join and leave. It can be used to broadcast
    events to a subset of clients.
*/


/* //PROBLEM 
Create multiple rooms with their limits. For eg: in a single room only 3 members are allowed to join.
*/

const express = require('express');
const http = require('http');
const path = require('path');
const {Server} = require('socket.io');

const port = 8000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let roomno = 1;
let users = 0;

io.on("connection", (socket) => {
    console.log("A new user connected with id: ", socket.id);

    socket.join("room-"+roomno);
    socket.emit("newUserConnectedMessage", {message: "You joined the room: "+roomno});

    socket.broadcast.to("room-"+roomno).emit("newUserConnectedMessage" ,{message: "A new user connected with id: "+socket.id});
    users++;
    if(users > 2){
        roomno++;
        users = 0;
    }

});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

server.listen(port, () => {
    console.log("Server listening on port: ", port);
});