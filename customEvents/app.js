const express = require('express');
const http = require('http');
const path = require('path');
const {Server} = require('socket.io');

const port = 8000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

io.on('connection', (socket)=>{
    console.log("A new user connected ", socket.id);

    socket.on("clientMessage", (data) => {
        //broadcast to all connected user including the sender.
        io.emit("serverMessage", data, socket.id);
    })

    //Listening to built-in event 'disconnect' which fires when a user is disconnected with server 
    socket.on("disconnect", ()=>{
         console.log("User disconnected ");
    })
})

server.listen(port, ()=>{
    console.log("Server listening on port: ",port);
})