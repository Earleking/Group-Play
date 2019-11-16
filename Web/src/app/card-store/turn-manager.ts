export enum MovementType
{
    click,
    drag
}

export class Move
{
    // The card code of the end card
    target:string;
    // Card code of start card
    home:string;
    // Click or drag. If click just use target
    movement:MovementType;
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
    // TODO a fuckton of stuff here to end turn and send data and stuff
}