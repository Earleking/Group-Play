const express = require('express');
const app = express();

const http = require('http');
const server = http.Server(app);

const socketIO = require('socket.io');
const io = socketIO(server);

const port = process.env.PORT || 3000;

const hostPort = process.env.PORT || 4000;

const request = require ( 'request' );

// var 
var clients = [ ];
var moves = [ ];
var host = "";
app.use(express.json())

app.post ( "/host", ( req, res ) => {
    for ( client of clients )
    {
        if ( client.disconnected === false )
        {
            client.emit ( "board", req.body );
        }
    }
    if ( req.body [ "turn" ] == true )
    {
        readyNextMove ( );
    }
    res.send ( "Got data" );
});

// Handler for new connections on the socket
io.on('connection', (socket) => {
    console.log('Client connected.');
    // socket.emit ( "board", );
    if ( clients.length == 0 )
    {
        request.post ( "http://localhost:5000/move", { json: { moves: [ ] } }, ( ) => { } );
    }
    clients.push ( socket );
    socket.on ( "submit", ( data ) => {
        try {
            moves.push ( JSON.parse ( data ) );
        } catch (error) {
            moves.push ( data );
        }
    });
});

function readyNextMove ( )
{
    setTimeout ( ( ) => {
        aggregateMoves ( );
        moves = [ ];
    }, 12000)
}

function aggregateMoves ( ) 
{
    console.log ( "agregattiong moves" );
    var votes = {

    }
    var cardId = 0;
    var bestCardId = "";
    var mostVotes = 0;
    for ( var move of moves )
    {
        if ( move.length != 0 & move [ 0 ] != undefined )
        {
            cardId = move [ 0 ] [ "CardID" ];
            if ( votes [ cardId ] )
            {
                votes [ cardId ] += 0;
            }
            else
            {
                votes [ cardId ] = 1;
            }
            if ( votes [ cardId ] > mostVotes )
            {
                mostVotes = votes [ cardId ];
                bestCardId = cardId;
            }
        }   
    }
    for ( var move of moves )
    {
        if ( move.length != 0 & move [ 0 ] != undefined )
        {
            if ( move [ 0 ] [ "CardId" ] == bestCardId )
            {
                request.post ( "http://localhost:5000/move", { json: { moves: move } }, ( ) => { } );
                return;
            }
        }
    }
    // Worst case I guess try and end turn
    request.post ( "http://localhost:5000/move", { json: { moves: [ { target: 0, refCard: 0, type: 4 }] } }, ( ) => { } );
                return;
}

server.listen(port, () => {
    console.log(`Started on port: ${port}`);
});
