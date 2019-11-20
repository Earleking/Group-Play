const express = require('express')
const app = express()
const request = require ( "request" );
const api = require ( "./api" );
const port = 5000
// var bodyParser = require('body-parser')

var control = require ( "./control" );
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
// app.use(bodyParser.json())
app.use(express.json())

app.get('/', (req, res) => res.send('Hello World!'))

app.post ( "/move", ( req, res ) => {
    control.doMoves ( req.body [ "moves" ], ( ) => {
        console.log ( "finished moves" );
        setTimeout ( ( ) => {
            api.getRectangles ( ( data ) => {
                if ( data != "ERROR" )
                {
                    console.log ( "posting data" );
                    request.post ( "http://localhost:3000/host", { json: data } );
                }
            } );
        }, 1000 );
    } );
    res.send ("recv");
} );

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
