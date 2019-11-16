import { CardClass } from './card-class';
import { stageConstants } from './stage-constants';

export class CardStore
{
    public cardInHand1 :Array< CardClass > = [];
    public cardInHand2 :Array< CardClass > = [];
    public cardOnBench1:Array< CardClass > = [];
    public cardOnBench2:Array< CardClass > = [];
    public cardOnBoard1:Array< CardClass > = [];
    public cardOnBoard2:Array< CardClass > = [];
    public spells      :Array< CardClass > = [];

}

export const cardStore = new CardStore ( );


export function configBattlePlayer ( )
{
    var cardWidth = stageConstants.battleCardSize.width + 5;
    // Do config and organize locations of places
    var width = document.getElementById ( `player-battle-1` ).clientWidth;
    var cardOffset = width / 2;

    var nOfCard = cardStore.cardOnBoard1.length;
    if ( 0 == nOfCard % 2)
    {
      // even number of cards
      cardOffset -= cardWidth * (nOfCard / 2);
    }
    else
    {
      // odd cards
      cardOffset -= cardWidth * .5;
      nOfCard -= 1;
      cardOffset -= cardWidth * (nOfCard / 2);
    }

    for ( var card of cardStore.cardOnBoard1 )
    {
        card [ "TopLeftX" ] = cardOffset;
        card [ "TopLeftY" ] = 0;
        card [ "Width" ] = stageConstants.battleCardSize.width;
        cardOffset += cardWidth;
    }
}