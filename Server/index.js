const express = require('express');
const app = express();

const http = require('http');
const server = http.Server(app);

const socketIO = require('socket.io');
const io = socketIO(server);

const port = process.env.PORT || 3000;

const hostPort = process.env.PORT || 4000;

var clients = [ ];
var moves = [ ];
var host = "";
app.use(express.json())

app.post ( "/host", ( req, res ) => {
    for ( client of clients )
    {
        client.emit ( "board", req.body );
    }
    res.send ( "Got data" );
});

// Handler for new connections on the socket
io.on('connection', (socket) => {
    console.log('Client connected.');
    // socket.emit ( "board", );
    clients.push ( socket );
    socket.on ( "submit", ( data ) => {
        try {
            moves.push ( JSON.parse ( data) );
        } catch (error) {
            moves.push ( data );
        }
    });
});

server.listen(port, () => {
    console.log(`Started on port: ${port}`);
});
