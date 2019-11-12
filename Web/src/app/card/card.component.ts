import { Component, OnInit, Input, HostListener, AfterViewInit, Directive } from '@angular/core';
import { CardStore, cardStore } from '../card-store/card-store';

@Directive ( {selector: '[dragit]'} )
export class DraggableDirective implements AfterViewInit {
  @Input() cardData;
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
  card:HTMLElement;
  draggable:boolean = true;
  initX:string;
  initY:string;
  curPosX:number;
  curPosY:number;

  constructor() { 
  }
  
  ngAfterViewInit() {
    this.card = <HTMLElement> document.getElementById ( `card-${this.cardData [ "TopLeftX" ]}` );
    this.initX = this.card.style.left;
    this.initY = this.card.style.top;
    this.curPosX = Number ( this.initX.substr ( 0, this.initX.length - 2) );
    this.curPosY = Number ( this.initY.substr ( 0, this.initY.length - 2) );
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

  dragStart ( event:MouseEvent )
  {
    if ( this.draggable )
    {
      // this.mouseMoveListener.bind ( this );
      // this.card.addEventListener ( "mousemove", this.mouseMoveListener );
    }
  }
  dragEnd ( event:MouseEvent )
  {
    // this.card.removeEventListener ( "mousemove", this.mouseMoveListener );
  }

  mouseMoveListener ( event:MouseEvent ) {
    console.log ( "mv" );
    var cardRef = event.target as HTMLElement;
    this.curPosX += event.movementX;
    this.curPosY += event.movementY;
    this.cardData [ "TopLeftX" ] = this.curPosX;
    // cardRef.style.left = `${this.curPosX}px`;
    // cardRef.style.top = `${this.curPosY}px`;
  }
}
