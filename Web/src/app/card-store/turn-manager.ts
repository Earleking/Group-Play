export enum PlayType
{
    play, // use card - aka drag and drop
    target, // target card - just click
    defend, // refCard is opponents and is used
    challenge, // refCard is yours and is used\
    endTurn,
    mulligan
}

export class Move
{
    target:number; // the cardid of the card you are moving
    refCard:number = 0; // if its a challenge or defend, then you need this to know where to move it
    // Click or drag. If click just use target
    type:PlayType;
}

export class TurnManager
{
    moves:Array<Move> = [ ];
    add ( move:Move )
    {
        this.moves.push ( move );
    }
}

export const turnManager = new TurnManager ( );
export function endTurn ( )
{
    console.log ( "Ending turn" );
    var data = {
        moves: turnManager.moves
    }
    // TODO a fuckton of stuff here to end turn and send data and stuff
}