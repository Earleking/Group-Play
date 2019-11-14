import { Component, OnInit, Input, HostListener, AfterViewInit, Directive, ApplicationRef, ChangeDetectorRef } from '@angular/core';
import { CardStore, cardStore } from '../card-store/card-store';
import { CardClass } from '../card-store/card-class';
import { stageConstants } from '../card-store/stage-constants';

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
    if ( this.cardData.Draggable )
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
      if ( this.canMakeMove ( ) )
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
        this.cardData.TopLeftX = this.initX;
        this.cardData.TopLeftY = this.initY;
        this.curPosX = this.initX;
        this.curPosY = this.initY;
      }
    }
    else if ( this.cardData.Location == "bench" )
    {
      if ( this.canMakeMove ( ) )
      {
        if ( this.moveToBattle ( ) ) 
        {
          this.initX = this.cardData.TopLeftX;
          this.initY = this.cardData.TopLeftY;
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

  canMakeMove ( )
  {
    return true;
  }

  moveToHand ( )
  {
    
    this.store.cardInHand1.push ( this.store.cardOnBench1.pop ( ) );
  }

  moveToBench ( )
  {
    var id = this.getCardId ( );

    return this.moveCardById ( id, this.store.cardInHand1, this.store.cardOnBench1 );
  }

  moveToBattle ( )
  {
    // we assume all container elements are the same width
    var enemies = this.store.cardOnBoard2.length;
    if ( enemies > 0 )
    {
      // We are moving to defend

      // To find out the section it was dropped into, we check how many cards are in play
      //  then we divide the width of that section into x number of "sections"
      //  based on which x you find yourself in, thats where you go. ezpz

      // var sectionSize = stageConstants.battleSize.width / enemies;
      // var sectionNumber = Math.floor ( this.curPosX / sectionSize );
      // this.cardData.TopLeftX = stageConstants.battleCardSize.width * sectionNumber;
      // this.cardData.TopLeftY = 0;

      var distance = 999999;
      var bestMatchIndex = -1;
      var bestMatchX = -1;
      for ( var i in this.store.cardOnBoard2 )
      {
        var xDiff = this.store.cardOnBoard2 [ i ].TopLeftX - this.cardData.TopLeftX;
        xDiff = Math.abs ( xDiff );
        if ( xDiff < distance )
        {
          // We are getting closer
          bestMatchIndex = Number ( i );
          distance = xDiff;
          bestMatchX = this.store.cardOnBoard2 [ i ].TopLeftX;
        }
        else
        {
          // Getting futher. Abort
          break;
        }
      }

      if ( bestMatchIndex < 0 )
      {
        return false;
      }

      this.cardData.TopLeftX = bestMatchX;
      this.cardData.TopLeftY = 0;
      this.cardData.BattleLocation = bestMatchIndex;

      return this.moveCardById ( this.getCardId ( ), this.store.cardOnBench1, this.store.cardOnBoard1, bestMatchIndex );
    }
    else
    {
      // We are moving to attack
    }
  }

  getCardId ( )
  {
    return this.cardData.CardID;
    // return this.card.id.split ( "-" ) [ 1 ];
  }

  moveCardById ( id:string, arrayFrom:Array<CardClass>, arrayTo:Array<CardClass>, insertIndex:number = -1 )
  {
    for ( var i in arrayFrom )
    {
      if ( id == arrayFrom[ i ].CardID )
      {
        if ( insertIndex > 0 && insertIndex < arrayTo.length )
        {
          arrayTo.splice ( insertIndex, 0, arrayFrom.splice ( Number ( i ), 1 ) [ 0 ] );
        }
        else
        {
          arrayTo.push ( arrayFrom.splice ( Number ( i ), 1 ) [ 0 ] );
        }
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
