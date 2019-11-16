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
    moves = [];
    add ( )
    {
        
    }
}

export const turnManager = new TurnManager ( );