import { Component, OnInit, Renderer, Renderer2, ViewEncapsulation, ComponentFactoryResolver } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CardStore, cardStore } from '../card-store/card-store';
import { CardClass } from '../card-store/card-class';
import { TurnService } from '../turn.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GamePageComponent implements OnInit {

  store:CardStore;

  boardHeight:number;
  boardWidth:number;
  displayedCards:Array< Map < string, any> >;

  constructor( private renderer:Renderer2,
               private componentFactory:ComponentFactoryResolver,
               private turnService: TurnService ) { 
    this.store = cardStore;
    this.displayedCards = require ( "src/assets/test2.json" );
    this.boardHeight = this.displayedCards [ "Screen" ] [ "ScreenHeight" ];
    this.boardWidth = this.displayedCards [ "Screen" ] [ "ScreenWidth" ];
    this.displayedCards = this.displayedCards [ "Rectangles" ];
  }

  ngOnInit() {
    this.sortCards ( );
  }

  sortCards ( ) {
    // filter cards into proper arrays yay
    for ( var card of this.displayedCards )
    {
      if ( card [ "CardCode" ] == "face" )
      {
        continue;
      }
      var cardY = card [ "TopLeftY" ];
      var cardObj = new CardClass ( );
      cardObj.populateWithJson ( card );
      cardObj.TopLeftY = 0;
      if ( cardY < this.boardHeight * .1 )
      {
        cardObj.Location = "hand";
        // cardObj.CardCode = "cardback";
        this.store.cardInHand1.push ( cardObj );
      }
      else if ( cardY < this.boardHeight * .37 )
      {
        cardObj.Location = "bench";
        this.store.cardOnBench1.push ( cardObj );
      }
      else if ( cardY < this.boardHeight* .46 )
      {
        cardObj.Location = "battle";
        this.store.cardOnBoard1.push ( cardObj );
      }
      else
      {
        cardObj.Draggable = false;
        if ( cardY < this.boardHeight * .57 )
        {
          cardObj.Location = "spell";
          this.store.spells.push ( cardObj );
        }
        else if ( cardY < this.boardHeight * .68 )
        {
          cardObj.Location = "battle";
          this.store.cardOnBoard2.push ( cardObj );
        }
        else
        {
          cardObj.Location = "bench";
          this.store.cardOnBench2.push ( cardObj );
        }

      }
    }
  }
}
