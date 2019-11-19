const express = require('express');
const app = express();

const http = require('http');
const server = http.Server(app);

const socketIO = require('socket.io');
const io = socketIO(server);

const port = process.env.PORT || 3000;

// Handler for new connections on the socket
io.on('connection', (socket) => {
    console.log('Client connected.');
});

server.listen(port, () => {
    console.log(`Started on port: ${port}`);
});
