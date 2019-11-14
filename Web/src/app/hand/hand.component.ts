import { Component, OnInit, Input } from '@angular/core';
import { CardStore, cardStore } from '../card-store/card-store';

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.css']
})
export class HandComponent implements OnInit {
  @Input ( ) localPlayer:boolean;
  store:CardStore = cardStore;
  isHandHovered:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  handHovered ( )
  {
    if ( false == this.localPlayer )
    {
      return;
    }

    if ( this.isHandHovered == true )
    {
      return;
    }
    this.isHandHovered = true;
    var hand:HTMLElement = document.getElementById ( "player-hand-1" );
    var pxValue:number ;

    // We assume the px value is xxxpx;
    // Get rid of the px part
    pxValue = Number ( hand.style.top.substr ( 0, hand.style.top.length - 2 ) );
    hand.style.top = `${pxValue - 100}px`
  }

  handUnHovered ( )
  {
    if ( false == this.localPlayer )
    {
      return;
    }
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
