export class CardStore
{
    public cardInHand1 :Array< Map < string, any> > = [];
    public cardInHand2 :Array< Map < string, any> > = [];
    public cardOnBench1:Array< Map < string, any> > = [];
    public cardOnBench2:Array< Map < string, any> > = [];
    public cardOnBoard1:Array< Map < string, any> > = [];
    public cardOnBoard2:Array< Map < string, any> > = [];
    public spells      :Array< Map < string, any> > = [];

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