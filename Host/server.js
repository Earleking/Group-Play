const express = require('express')
const app = express()
const request = require ( "request" );
const api = require ( "./api" );
const fs = require('fs')
const path = require('path')

const port = 5000
// var bodyParser = require('body-parser')

var control = require ( "./control" );
var watcher = require ( "./watcher" );
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
                    var sendJson = {
                        attackToken: watcher.getAttackToken ( ),
                        mana: watcher.getMana ( ),
                        spellMana: watcher.getSpellMana ( ),
                        data: data
                    }
                    request.post ( "http://localhost:3000/host", { json: sendJson } );
                }
            } );
        }, 1000 );
    } );
    res.send ("recv");
} );

app.get('/video', function(req, res) {
    const path = 'assets/sample.mp4'
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range
  
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1]
        ? parseInt(parts[1], 10)
        : fileSize-1
  
      if(start >= fileSize) {
        res.status(416).send('Requested range not satisfiable\n'+start+' >= '+fileSize);
        return
      }
      
      const chunksize = (end-start)+1
      const file = fs.createReadStream(path, {start, end})
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      }
  
      res.writeHead(206, head)
      file.pipe(res)
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(200, head)
      fs.createReadStream(path).pipe(res)
    }
  })

app.listen(port, () => { console.log(`Example app listening on port ${port}!`) } );
