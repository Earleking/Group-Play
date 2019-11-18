const api = require ( "./api" );

var robot = require("robotjs");


function clickPhaseButton ( callback = () => {} ) {
    var screen = robot.getScreenSize ( );
    robot.moveMouse ( screen.width * .86,
                      screen.height * .5 );
    setTimeout ( ( ) => {
        robot.mouseClick ( "left", false );
        setTimeout ( ( ) => {
            callback ( );
        }, 200);
    }, 200);
}

function setCardsToAttack() {

}

function playCard( cardId, callback = () => {} ) {
    api.getRectangles ( ( data ) => {
        if ( data == "ERROR" )
        {
            return;
        }
        for ( var card of data [ "Rectangles" ] )
        {
            // console.log ( card );
            if ( card [ "CardID" ] == cardId )
            {
                console.log ( "moving card" );
                console.log ( card );
                var screen = robot.getScreenSize ( );
                var cardHeight = card [ "Height" ];
                var cardWidth = card [ "Width" ];
                console.log ( screen );
                console.log ( ( card [ "TopLeftY" ] + ( cardHeight / 2 ) ) );
                robot.moveMouse  (  card [ "TopLeftX" ] + ( cardWidth / 2 ),
                                    screen.height - ( card [ "TopLeftY" ] - ( cardHeight / 2 ) ) );
                robot.mouseClick ( "right", false );
                robot.mouseToggle ( "down" );
                // REEE this setTimeout chain is so bad
                // But needed to give the computer time to register each input
                setTimeout ( ( ) => {
                    robot.dragMouse ( screen.width / 2, screen.height / 2 );
                    setTimeout ( ( ) => {
                        robot.mouseToggle ( "up" );                    
                        setTimeout ( ( ) => {
                            callback ( );
                        }, 200 );
                    }, 200 );
                }, 200 );
                return;
            }
        }
    } );
}

setTimeout ( () => {
    playCard ( 1937739069, ( ) => {
        clickPhaseButton ( );
    } );
}, 2000 );

module.exports = {
    clickPhaseButton: clickPhaseButton,
    setCardsToAttack: setCardsToAttack,
    playCard: playCard
};