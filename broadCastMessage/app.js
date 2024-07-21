/*
Challenge ->
    <a> User can see how many user connected
    <b>If user connected, then show a welcome message to the user, and other user
        can see how many users connected..
*/

const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const path = require('path');

const port = 8000;

const app = express();

const server = http.createServer(app);

const io = new Server(server);

let users = 0;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

io.on("connection", (socket) => {
    console.log("New user connected with id: ", socket.id);

    users++;

    //Fires a custom event to the newly connected user
    socket.emit('newConnectedUser', {message: "Hello, Welcome dear!"});

    //Fires a custom event to all connected users except the sender...
    socket.broadcast.emit("newConnectedUser", {message: `${users} user connected`});

    socket.on('disconnect', ()=>{
        console.log("A user diconnected");
        users--;
        socket.broadcast.emit("newConnectedUser", {message: `${users} users connected`});
    });
})


server.listen(port, () => {
    console.log("Server listening on port: ", port);
});