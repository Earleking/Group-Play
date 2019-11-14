import { Component, OnInit, OnChanges, Input, AfterViewInit } from '@angular/core';
import { CardStore, cardStore } from '../card-store/card-store';
import { StageConstants, stageConstants } from '../card-store/stage-constants';

@Component({
  selector: 'app-bench',
  templateUrl: './bench.component.html',
  styleUrls: ['./bench.component.css']
})
export class BenchComponent implements AfterViewInit, OnChanges {
  @Input ( ) localPlayer:boolean;
  store:CardStore = cardStore;
  constants:StageConstants = stageConstants;
  cardWidth:number = this.constants.benchCardSize.width + 20;

  constructor() { 
    console.log ( this.store );
  }
  
  ngAfterViewInit() {
    console.log ( this.localPlayer );
    this.config ( );
  }

  ngOnChanges ( )
  {
    console.log ( "CHEGE" );
    // this.config ( );
  }

  config ( )
  {
    // Do config and organize locations of places
    var playerId = this.localPlayer?'1':'2';
    var width = document.getElementById ( `player-bench-${playerId}` ).clientWidth;
    var cardOffset = width / 2;

    var nOfCard = this.store.cardOnBench1.length;
    if ( 0 == nOfCard % 2)
    {
      // even number of cards
      cardOffset -= this.cardWidth * (nOfCard / 2);
    }
    else
    {
      // odd cards
      cardOffset -= this.cardWidth * .5;
      nOfCard -= 1;
      cardOffset -= this.cardWidth * (nOfCard / 2);
    }

    for ( var card of this.store.cardOnBench1 )
    {
      if ( card.Dragged == false )
      {
        card [ "TopLeftX" ] = cardOffset;
        card [ "TopLeftY" ] = 0;
        card [ "Width" ] = this.constants.benchCardSize.width;
      }
      cardOffset += this.cardWidth;
    }

    setTimeout ( () => {
      this.config ( );
    }, 10 );
  }

}
