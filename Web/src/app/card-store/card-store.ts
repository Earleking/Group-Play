export class CardStore
{
    public cardInHand1 :Array< Map < string, any> > = [];
    public cardInHand2 :Array< Map < string, any> > = [];
    public cardOnBench1:Array< Map < string, any> > = [];
    public cardOnBench2:Array< Map < string, any> > = [];
    public cardOnBoard1:Array< Map < string, any> > = [];
    public cardOnBoard2:Array< Map < string, any> > = [];
    public spells      :Array< Map < string, any> > = [];
}

export const cardStore = new CardStore ( );