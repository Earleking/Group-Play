import { Component, OnInit } from '@angular/core';
import { CardStore, cardStore } from '../card-store/card-store';

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.css']
})
export class HandComponent implements OnInit {

  store:CardStore = cardStore;
  isHandHovered:boolean = false;

  constructor() { }

  ngOnInit() {
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
