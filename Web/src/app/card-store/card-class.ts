import { stageConstants } from './stage-constants';
import { cardStore } from './card-store';

export enum CardTypes {
    unit,
    spell
}

class CardSelect {
    public targets: Array<string>;
    public count: number;
}

export class CardClass {
    public CardID:number;
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
    public Outline:string = "playable"; // an int representing what outline to have

    // Ok this one is kinda weird and a hack
    // This is literally just for a card that you move to store state
    // Cards that start on the battle board don't even use this ahhhh
    public BattleLocation:number = -1;

    public ManaCost: number;
    public IsTargetable: boolean;
    public IsChallenger: boolean = false;
    public Actions: CardSelect;

    populateWithJson ( json ) {
        this.CardID = json [ "CardID" ];
        this.CardCode = json [ "CardCode" ];
        this.Width = json [ "Width" ];
        this.Height = json [ "Height" ];
        this.TopLeftX = json [ "TopLeftX" ];
        this.TopLeftY = json [ "TopLeftY" ];
        this.LocalPlayer = json [ "LocalPlayer" ];
        if ( this.LocalPlayer == true )
        {
            // Only look for more data on local players
            // We don't move their cards
            var data = getCardDataByCode ( this.CardCode );
            if ( data )
            {
                switch ( data [ "type" ] ) {
                    case "Unit":
                        this.CardType == CardTypes.unit;
                        break;
                    case "Spell":
                        this.CardType = CardTypes.spell;
                        break;
                    default:
                        break;
                }
                if ( data [ "keywords" ].includes ( "Challenger" ) )
                {
                    this.IsChallenger = true;
                }
                this.ManaCost = data [ "cost" ];
                if ( data [ "action" ] )
                {
                    var newSelector = new CardSelect ( );
                    newSelector.count = data [ "action" ] [ "number" ];
                    newSelector.targets = data [ "action" ] [ "targets" ];
                    this.Actions = newSelector;
                }
            }
        }
    }
}

const CardJson = require ( "src/assets/cardData.json" );

export function getCardDataByCode ( cardCode:string )
{
    return CardJson.filter ( 
        ( data ) => {
            return data [ "cardCode" ] == cardCode;
        }
    ) [ 0 ];
}

// returns the new area it is being moved to
export function newArea ( card:CardClass )
{
    var offsetY:number;
    switch (card.Location) {
        case "hand":
            offsetY = card.LocalPlayer ? stageConstants.handSize.top.p1 : stageConstants.handSize.top.p2;
            break;
        case "bench":
            offsetY = card.LocalPlayer ? stageConstants.benchSize.top.p1 : stageConstants.benchSize.top.p2;
            break;
        case "battle":
            offsetY = card.LocalPlayer ? stageConstants.battleSize.top.p1 : stageConstants.battleSize.top.p2;
            break;
        default:
            return "";
    }
    offsetY += card.TopLeftY;
    if ( card.LocalPlayer )
    {
        if ( card.CardType == CardTypes.spell )
        {
            if ( offsetY < stageConstants.battleSize.top.p1 )
            {
                return "spell";
            }
            return "hand";
        }
        if ( offsetY <= stageConstants.benchSize.top.p1 )
        {
            return "battle";
        }
        if ( offsetY <= stageConstants.handSize.top.p1 )
        {
            return "bench";
        }
        return "hand";
    }
    else
    {
        if ( card.CardType == CardTypes.spell )
        {
            if ( offsetY > stageConstants.battleSize.top.p2 )
            {
                return "spell";
            }
            return "hand";
        }
        if ( offsetY >= stageConstants.battleSize.top.p2 )
        {
            return "battle";
        }
        if ( offsetY >= stageConstants.benchSize.top.p2 )
        {
            return "bench";
        }
        return "hand";
    }
}

// This is to find the lane slot the player's card that is passed is in
// Or at least closest to
export function getBattleLaneSlot ( card:CardClass )
{
    var distance = 999999;
    var bestMatchIndex = -1;

    var array = card.LocalPlayer ? cardStore.cardOnBoard2 : cardStore.cardOnBoard1;

    for ( var i in array )
    {
        var xDiff = array [ i ].TopLeftX - card.TopLeftX;
        xDiff = Math.abs ( xDiff );
        if ( xDiff < distance )
        {
            // We are getting closer
            bestMatchIndex = Number ( i );
            distance = xDiff;
        }
        else
        {
            // Getting futher. Abort
            break;
        }
    }
    return bestMatchIndex;
}

export function getChallengerBattleLaneSlot ( card:CardClass )
{
    var distance = 999999;
    var bestMatchIndex = -1;

    var array = card.LocalPlayer ? cardStore.cardOnBoard2 : cardStore.cardOnBoard1;

    for ( var i in array )
    {
        var xDiff = array [ i ].TopLeftX - card.TopLeftX;
        xDiff = Math.abs ( xDiff );
        if ( xDiff < distance )
        {
            if ( array [ i ].IsChallenger )
            {
                // We are getting closer
                bestMatchIndex = Number ( i );
                distance = xDiff;
            }
        }
        else
        {
            // Getting futher. Abort
            break;
        }
    }
    return bestMatchIndex;
}

export function isBattleSlotEmpty ( slot:number )
{
    for ( var card of cardStore.cardOnBoard1 )
    {
        if ( card.BattleLocation === slot )
        {
            return false;
        }
    }
    return true;
}

export function getLocalCardByBattleSlot ( slot:number )
{
    for ( var card of cardStore.cardOnBoard1 )
    {
        if ( card.BattleLocation === slot )
        {
            return card;
        }
    }
    // this is a serious o fuck.
    // Should never hit here if everything else is going well
    console.log ( "FUCK. Trying to find enemy card on battle that doesn't exist" );
    return null;
}

export function getEnemyCardByBattleSlot ( slot:number )
{
    for ( var card of cardStore.cardOnBoard2 )
    {
        if ( card.BattleLocation === slot )
        {
            return card;
        }
    }
    // this is a serious o fuck.
    // Should never hit here if everything else is going well
    console.log ( "FUCK. Trying to find enemy card on battle that doesn't exist" );
    return null;
}