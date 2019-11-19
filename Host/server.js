const express = require('express')
const app = express()
const port = 3000
// var bodyParser = require('body-parser')

var control = require ( "./control" );
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
// app.use(bodyParser.json())
app.use(express.json())

app.get('/', (req, res) => res.send('Hello World!'))

app.post ( "/move", ( req, res ) => {
    control.doMoves ( req.body [ "moves" ] );
    res.send ("recv");
} );

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
