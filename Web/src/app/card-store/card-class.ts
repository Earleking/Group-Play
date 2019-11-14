enum CardTypes {
    unit,
    spell
}

export class CardClass {
    public CardID:string;
    public CardCode:string;
    public Width:number;
    public Height:number;
    public TopLeftX:number;
    public TopLeftY:number;
    public LocalPlayer:boolean;
    public Location:string;
    public Selectable:boolean = false;
    public Dragged:boolean = false;
    public Draggable:boolean = true;
    public CardType:CardTypes = CardTypes.unit;

    // Ok this one is kinda weird and a hack
    // This is literally just for a card that you move to store state
    // Cards that start on the battle board don't even use this ahhhh
    public BattleLocation:number = -1;

    public cardType: String;
    public manaCost: number;
    public isTargetable: boolean;

    populateWithJson ( json ) {
        this.CardID = json [ "CardID" ];
        this.CardCode = json [ "CardCode" ];
        this.Width = json [ "Width" ];
        this.Height = json [ "Height" ];
        this.TopLeftX = json [ "TopLeftX" ];
        this.TopLeftY = json [ "TopLeftY" ];
        this.LocalPlayer = json [ "LocalPlayer" ];
    }
}