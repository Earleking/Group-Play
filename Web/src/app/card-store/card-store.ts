import { CardClass } from './card-class';

export class CardStore
{
    public cardInHand1 :Array< CardClass > = [];
    public cardInHand2 :Array< CardClass > = [];
    public cardOnBench1:Array< CardClass > = [];
    public cardOnBench2:Array< CardClass > = [];
    public cardOnBoard1:Array< CardClass > = [];
    public cardOnBoard2:Array< CardClass > = [];
    public spells      :Array< CardClass > = [];

    // To be finetuned
    public benchSize = {
        width: 176,
        height: 158
    };
    public handSize = {
        width: 127,
        height: 160
    }
    // Battle size is just max width
    public battleSize = {
        width: 176,
        height: 158
    }

}

export const cardStore = new CardStore ( );