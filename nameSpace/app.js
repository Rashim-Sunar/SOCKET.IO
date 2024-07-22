/*
 NameSpace
   --> provide a way to create a separate channel within a single connection.
*/

const express = require('express');
const http = require('http');
const path = require('path');
const {Server} = require('socket.io');

const port = 8000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

//Creating a namespace
const nsp = io.of("/myNameSpace");

nsp.on('connection', (socket)=> {
    console.log("A user connected with id: ", socket.id);

    socket.on("message", (data)=> {
        console.log(data);
    })

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    })
});

server.listen(port, () => {
    console.log("Server listening on port: ", port);
});