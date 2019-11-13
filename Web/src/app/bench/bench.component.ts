import { Component, OnInit } from '@angular/core';
import { CardStore, cardStore } from '../card-store/card-store';

@Component({
  selector: 'app-bench',
  templateUrl: './bench.component.html',
  styleUrls: ['./bench.component.css']
})
export class BenchComponent implements OnInit {
  store:CardStore = cardStore;
  cardWidth:number = 230;

  constructor() { 
    console.log ( this.store );
  }
  
  ngOnInit() {
    this.config ( );
  }

  config ( )
  {
    // Do config and organize locations of places
    var width = document.getElementById ( "player-bench-1" ).clientWidth;
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
      card [ "TopLeftX" ] = cardOffset;
      cardOffset += this.cardWidth;
    }

  }

}
