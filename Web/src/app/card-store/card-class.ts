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