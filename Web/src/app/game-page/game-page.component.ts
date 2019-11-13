import { Component, OnInit, Renderer, Renderer2, ViewEncapsulation, ComponentFactoryResolver } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CardStore, cardStore } from '../card-store/card-store';

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

  constructor( private renderer:Renderer2, private componentFactory:ComponentFactoryResolver ) { 
    this.store = cardStore;
    this.displayedCards = require ( "src/assets/test.json" );
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
      var cardY = card [ "TopLeftY" ];
      if ( cardY < this.boardHeight * .1 )
      {
        this.store.cardInHand2.push ( card );
      }
      else if ( cardY < this.boardHeight * .37 )
      {
        this.store.cardOnBench2.push ( card );
      }
      else if ( cardY < this.boardHeight* .46 )
      {
        this.store.cardOnBoard2.push ( card );
      }
      else if ( cardY < this.boardHeight * .57 )
      {
        this.store.spells.push ( card );
      }
      else if ( cardY < this.boardHeight * .68 )
      {
        this.store.cardOnBoard1.push ( card );
      }
      else if ( cardY < this.boardHeight * .83 )
      {
        this.store.cardOnBench1.push ( card );
      }
      else
      {
        this.store.cardInHand1.push ( card );
      }
      card [ "TopLeftY" ] = 0;
    }
  }
}
