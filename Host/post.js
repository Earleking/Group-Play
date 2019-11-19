var request = require ( "request" );
var x = {
	"moves": [
		{
			"target": 1979673340,
			"refCard": 0,
			"type": 0
		},
		{
			"target": 338737632,
			"refCard": 1979673340,
			"type": 3
		}
	]
}

request.post ( "http://localhost:3000/move", { json: x }, ( err, res, data ) => {
    console.log ( data );
})