var request = require ( "request" );

function getRectangles ( callback )
{
    request.get ( "http://localhost:21337/positional-rectangles", ( err, res, data ) => {
        if ( data )
        {
            var send = {};
            try {
                data = JSON.parse ( data );
            } catch (error) {

            }
            callback ( data );
        }
        else
        {
            callback ( "ERROR" );
        }
    } );
}

module.exports = {
    getRectangles: getRectangles
}