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

}

export const cardStore = new CardStore ( );