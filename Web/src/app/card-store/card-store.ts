import { CardClass, CardTypes } from './card-class';
import { stageConstants } from './stage-constants';
import { gameState, GamePhase } from './game-state';

export class CardStore {
    public cardInHand1: Array<CardClass> = [];
    public cardInHand2: Array<CardClass> = [];
    public cardOnBench1: Array<CardClass> = [];
    public cardOnBench2: Array<CardClass> = [];
    public cardOnBoard1: Array<CardClass> = [];
    public cardOnBoard2: Array<CardClass> = [];
    public spells: Array<CardClass> = [];
    public mulligan: Array<CardClass> = [];

    public clearStore() {
        this.cardInHand1 = [];
        this.cardInHand2 = [];
        this.cardOnBench1 = [];
        this.cardOnBench2 = [];
        this.cardOnBoard1 = [];
        this.cardOnBoard2 = [];
        this.spells = [];
    }
}

export const cardStore = new CardStore();


export function configBattlePlayer() {
    var cardWidth = stageConstants.battleCardSize.width + 5;
    // Do config and organize locations of places
    // var width = document.getElementById ( `player-battle-1` ).clientWidth;
    var width = stageConstants.battleSize.width;
    var cardOffset = width / 2;

    var nOfCard = cardStore.cardOnBoard1.length;
    if (0 == nOfCard % 2) {
        // even number of cards
        cardOffset -= cardWidth * (nOfCard / 2);
    }
    else {
        // odd cards
        cardOffset -= cardWidth * .5;
        nOfCard -= 1;
        cardOffset -= cardWidth * (nOfCard / 2);
    }

    for (var card of cardStore.cardOnBoard1) {
        card["TopLeftX"] = cardOffset;
        card["TopLeftY"] = 0;
        card["Width"] = stageConstants.battleCardSize.width;
        cardOffset += cardWidth;
    }
}

export function loadLocalStore ( )
{
    loadStore ( require ( "src/assets/test2.json" ) );
}

export function loadStore ( jsonData ) {
    cardStore.clearStore();
    var boardHeight = jsonData [ "Screen" ] [ "ScreenHeight" ];
    // filter cards into proper arrays yay
    for (var card of jsonData [ "Rectangles" ] ) {
        if (card["CardCode"] == "face") {
            continue;
        }
        var cardY = card["TopLeftY"];
        var cardObj = new CardClass();
        cardObj.populateWithJson(card);
        cardObj.TopLeftY = 0;
        if (cardY < boardHeight * .1) {
            cardObj.Location = "hand";
            // cardObj.CardCode = "cardback";
            cardStore.cardInHand1.push(cardObj);
        }
        else if (cardY < boardHeight * .37) {
            cardObj.Location = "bench";
            cardStore.cardOnBench1.push(cardObj);
        }
        else if (cardY < boardHeight * .46) {
            cardObj.Location = "battle";
            cardStore.cardOnBoard1.push(cardObj);
        }
        else {
            cardObj.Draggable = false;
            if (cardY < boardHeight * .57) {
                cardObj.Location = "spell";
                cardObj.CardType = CardTypes.spell;
                cardStore.spells.push(cardObj);
            }
            else if (cardY < boardHeight * .68) {
                cardObj.Location = "battle";
                // Whoa we are in combat
                if ( cardObj.LocalPlayer == true )
                {
                    // LOL THIS IS MULLIGAN TIME
                    cardObj.IsMulligan = true;
                    cardStore.mulligan.push ( cardObj );
                }
                else
                {
                    gameState.Phase = GamePhase.combat;
                    cardStore.cardOnBoard2.push(cardObj);
                }
            }
            else {
                cardObj.Location = "bench";
                cardStore.cardOnBench2.push(cardObj);
            }
        }
    }
    if (0 == cardStore.cardOnBoard2.length) {
        configBattlePlayer();
    }
    if ( 0 != cardStore.mulligan.length )
    {
        var mulEle = document.getElementById ( "mulligan" );
        mulEle.style.display = "block";
    }
    else
    {
        var mulEle = document.getElementById ( "mulligan" );
        mulEle.style.display = "none";
    }
}
