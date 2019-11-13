import { Component, OnInit, Input, HostListener, AfterViewInit, Directive, ApplicationRef, ChangeDetectorRef } from '@angular/core';
import { CardStore, cardStore } from '../card-store/card-store';
import { CardClass } from '../card-store/card-class';

@Directive ( {selector: '[dragit]'} )
export class DraggableDirective implements AfterViewInit {
  @Input() cardData:CardClass;
  @Input() location:string;
  card:HTMLElement;
  initX:number;
  initY:number;
  curPosX:number;
  curPosY:number;
  draggable:boolean = true;
  dragging:boolean = false;
  store:CardStore;

  constructor ( private cd:ChangeDetectorRef ) {
  }

  ngAfterViewInit ( )
  {
    this.store = cardStore;
    this.card = <HTMLElement> document.getElementById ( `card-${this.cardData.CardID}` );
    this.initX = this.cardData.TopLeftX;
    this.initY = this.cardData.TopLeftY;
    this.curPosX = this.initX;
    this.curPosY = this.initY;
  }

  @HostListener ( "mousedown" )
  startDrag ( )
  {
    this.initX = this.cardData.TopLeftX;
    this.initY = this.cardData.TopLeftY;
    this.curPosX = this.initX;
    this.curPosY = this.initY;
    if ( this.draggable )
    {
      this.cardData.Dragged = true;
    }
  }

  
  @HostListener ( "mousemove", ['$event'] )
  dragCard ( event:MouseEvent ) {
    if ( this.cardData.Dragged )
    {
      this.curPosX += event.movementX;
      this.curPosY += event.movementY;
      this.cardData.TopLeftX = this.curPosX;
      this.cardData.TopLeftY = this.curPosY;
    }
  }
  @HostListener ( "mouseup" )
  endDrag ( )
  {
    this.cardData.Dragged = false;
    if ( this.cardData.Location == "hand" )
    {
      if ( this.moveToBench ( ) )
      {
        this.initX = this.curPosX;
        this.initY = this.curPosY;
      }
      else
      {
        this.cardData.TopLeftX = this.initX;
        this.cardData.TopLeftY = this.initY;
        this.curPosX = this.initX;
        this.curPosY = this.initY;
      }
    }
    else
    {
      // IDK what this is
      this.cardData.TopLeftX = this.initX;
      this.cardData.TopLeftY = this.initY;
      // this.curPosX = this.initX;
      // this.curPosY = this.initY;
    }
  }

  moveToHand ( )
  {
    
    this.store.cardInHand1.push ( this.store.cardOnBench1.pop ( ) );
  }

  moveToBench ( )
  {
    var id = this.card.id.split ( "-" ) [ 1 ]
    for ( var i in this.store.cardInHand1 )
    {
      if ( id == this.store.cardInHand1[ i ].CardID )
      {
        this.store.cardOnBench1.push ( this.store.cardInHand1.splice ( Number ( i ), 1 ) [ 0 ] );
        return true;
      }
    }
    return false;
  }
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements AfterViewInit {
  @Input() cardData:CardClass;
  card:HTMLElement;

  constructor() { 
  }
  
  ngAfterViewInit() {
    this.card = <HTMLElement> document.getElementById ( `card-${this.cardData.CardID}` );
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
