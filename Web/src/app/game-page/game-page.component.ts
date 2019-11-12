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

  cardInHand1 :Array< Map < string, any> > = [];
  cardInHand2 :Array< Map < string, any> > = [];
  cardOnBench1:Array< Map < string, any> > = [];
  cardOnBench2:Array< Map < string, any> > = [];
  cardOnBoard1:Array< Map < string, any> > = [];
  cardOnBoard2:Array< Map < string, any> > = [];
  spells      :Array< Map < string, any> > = [];

  isHandHovered:boolean = false;


  constructor( private renderer:Renderer2, private componentFactory:ComponentFactoryResolver ) { 
    this.store = cardStore;
    this.displayedCards = require ( "src/assets/test.json" );
    this.boardHeight = this.displayedCards [ "Screen" ] [ "ScreenHeight" ];
    this.boardWidth = this.displayedCards [ "Screen" ] [ "ScreenWidth" ];
    this.displayedCards = this.displayedCards [ "Rectangles" ];
    // this.cardInHand1
  }

  ngOnInit() {
    this.sortCards ( );
    // this.renderHand ( this.cardInHand1 );
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

  renderHand ( cards:Array<Map<string, any>> )
  {
    
    var hand:HTMLElement = document.getElementById ( "hand-list-1" );

    // As you add more cards to your hand they overlap. Simulate that. 
    var overlap:number = 0;

    // for ( var card of cards )
    // {
    //   var cardCode:string = card [ "CardCode" ];
    //   // Create card
    //   var imgElement = document.createElement ( "img" );
    //   imgElement.src = `assets/cards/${cardCode}.png`;
    //   this.renderer.addClass ( imgElement, "card-img-style" );
    //   this.renderer.addClass ( imgElement, "usable" );

    //   var liElement = document.createElement ( "li" );
    //   this.renderer.addClass ( liElement, "card-in-hand" );

    //   liElement.style.width = `${card [ "Width" ]}px`;
    //   liElement.style.height = `${card [ "Height" ]}px`;
    //   liElement.style.left = `${ card [ "TopLeftX" ] }px`;
    //   liElement.appendChild ( imgElement );
    //   hand.appendChild ( liElement );
    // }

    for ( var card of cards )
    {
      var cardCode:string = card [ "CardCode" ];
      var x = this.componentFactory.resolveComponentFactory ( CardComponent );
      // hand.
    }
  }
  handHovered ( )
  {
    console.log ( "enter" );
    if ( this.isHandHovered == true )
    {
      return;
    }
    this.isHandHovered = true;
    var hand:HTMLElement = document.getElementById ( "player-hand-1" );
    var pxValue = hand.style.top;

    // We assume the px value is xxxpx;
    // Get rid of the px part
    pxValue = pxValue.substr ( 0, pxValue.length - 2 );
    hand.style.top = `870px`
  }

  handUnHovered ( )
  {
    if ( this.isHandHovered == false )
    {
      return;
    }
    this.isHandHovered = false;
    var hand:HTMLElement = document.getElementById ( "player-hand-1" );
    var pxValue = hand.style.top;

    // We assume the px value is xxxpx;
    // Get rid of the px part
    pxValue = pxValue.substr ( 0, pxValue.length - 2 );
    hand.style.top = `970px`
  }
}
