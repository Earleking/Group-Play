import { Component, OnInit, Input, HostListener, AfterViewInit, Directive } from '@angular/core';
import { CardStore, cardStore } from '../card-store/card-store';

@Directive ( {selector: '[dragit]'} )
export class DraggableDirective implements AfterViewInit {
  @Input() cardData;
  @Input() location:string;
  card:HTMLElement;
  initX:number;
  initY:number;
  curPosX:number;
  curPosY:number;
  draggable:boolean = true;
  dragging:boolean = false;
  store:CardStore;

  ngAfterViewInit ( )
  {
    this.store = cardStore;
    this.card = <HTMLElement> document.getElementById ( `card-${this.cardData [ "TopLeftX" ]}` );
    this.initX = Number ( this.card.style.left.substr ( 0, this.card.style.left.length - 2) );
    this.initY = Number ( this.card.style.top.substr ( 0, this.card.style.top.length - 2) );
    this.curPosX = this.initX;
    this.curPosY = this.initY;
  }

  @HostListener ( "mousedown" )
  startDrag ( )
  {
    console.log ( this.store );
    if ( this.draggable )
    {
      this.dragging = true;
    }
  }

  
  @HostListener ( "mousemove", ['$event'] )
  dragCard ( event:MouseEvent ) {
    if ( this.dragging )
    {
      this.curPosX += event.movementX;
      this.curPosY += event.movementY;
      this.cardData [ "TopLeftX" ] = this.curPosX;
      this.cardData [ "TopLeftY" ] = this.curPosY;
    }
    // this.cardData [ "TopLeftX" ] = 20;
  }
  @HostListener ( "mouseup" )
  endDrag ( )
  {
    this.dragging = false;
    if ( true )
    {
      this.cardData [ "TopLeftX" ] = this.initX;
      this.cardData [ "TopLeftY" ] = this.initY;
      this.curPosX = this.initX;
      this.curPosY = this.initY;
    }
  }
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements AfterViewInit {
  @Input() cardData;
  @Input() location:string;
  card:HTMLElement;

  constructor() { 
  }
  
  ngAfterViewInit() {
    console.log ( this.cardData );
    this.card = <HTMLElement> document.getElementById ( `card-${this.cardData [ "TopLeftX" ]}` );
  }

  cardHovered ( event: MouseEvent )
  {
    this.card.style.setProperty ( "transform", "scale(1.35)" );
    this.card.style.setProperty ( "z-index", "11" );
  }

  cardUnHovered ( event:MouseEvent )
  {
    this.card.style.setProperty ( "transform", "scale(1)" );
    this.card.style.setProperty ( "z-index", "0" );
  }
}
