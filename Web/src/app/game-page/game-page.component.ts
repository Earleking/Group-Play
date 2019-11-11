import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {

  cardInHand1:Array<string>;

  constructor() { 
    this.cardInHand1 = [ "01DE001", "01DE001", "01DE001" ];
  }

  ngOnInit() {
    this.renderHand ( this.cardInHand1 );
  }

  renderHand ( cards:Array<string> )
  {
    var hand:HTMLElement = document.getElementById ( "player-hand-1" );
    for ( var card in cards )
    {

    }
  }

}
