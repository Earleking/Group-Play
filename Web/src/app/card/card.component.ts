import { Component, OnInit, Input, HostListener, AfterViewInit, Directive, ApplicationRef, ChangeDetectorRef } from '@angular/core';
import { CardStore, cardStore, configBattlePlayer } from '../card-store/card-store';
import { CardClass, newArea, getBattleLaneSlot, getLocalCardByBattleSlot, getChallengerBattleLaneSlot, CardTypes } from '../card-store/card-class';
import { stageConstants } from '../card-store/stage-constants';
import { DragService } from '../drag.service';
import { endTurn, turnManager, Move, PlayType } from '../card-store/turn-manager';
import { gameState, GameState } from '../card-store/game-state';
import { TurnService } from '../turn.service';
import { TargetService } from '../target.service';

@Directive ( {selector: '[dragit]'} )
export class DraggableDirective implements AfterViewInit {
  @Input() cardData:CardClass;
  card:HTMLElement;
  initX:number;
  initY:number;
  curPosX:number;
  curPosY:number;
  draggable:boolean = true;
  dragging:boolean = false;
  store:CardStore;

  constructor ( private cd:ChangeDetectorRef,
                private cardRule:DragService,
                private turnService: TurnService,
                private target:TargetService ) {

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
    if ( this.cardData.Selectable == true || this.cardData.IsMulligan )
    {
      return;
    }

    this.initX = this.cardData.TopLeftX;
    this.initY = this.cardData.TopLeftY;
    this.curPosX = this.initX;
    this.curPosY = this.initY;
    if ( this.cardData.Draggable && this.turnService.getCanMove() )
    {
      this.cardData.Dragged = true;
    }
    else if ( this.cardData.LocalPlayer == false &&
              this.cardData.Location == "bench" && 
              gameState.IsChallenging == true )
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
    if ( this.cardData.Selectable == true )
    {
      var move = new Move ( );
      move.target = this.cardData.CardID;
      move.type = PlayType.target;
      this.turnService.logMove ( move );
      this.target.selectedTarget ( );
      return;
    }
    if ( this.cardData.IsMulligan == true )
    {
      console.log ( "mullign" );
      var move = new Move ( );
      move.target = this.cardData.CardID;
      move.type = PlayType.mulligan;
      this.turnService.logMove ( move );
      return; 
    }
    this.cardData.Dragged = false;
    if ( this.turnService.getCanMove() && this.cardRule.moveCard ( this.cardData) ) // check if move is legal here
    {
      if ( this.cardData.Location == "hand" )
      {
        if ( newArea ( this.cardData ) == "bench" )
        {
          if ( this.moveToBench ( ) ) 
          {
            this.finalizeMove ( );
            // sometimes we can have actions that occur after summon

            // As this is not a sync function, we will call end turn somewhere inside here
            this.checkForActions ( );
          }
          else
          {
            this.resetCard ( );
          }
        }
        else if ( this.cardData.CardType == CardTypes.spell )
        {
          if ( this.playSpell ( ) )
          {
            this.finalizeMove ( );
            this.checkForActions ( );
          }
          else
          {
            this.resetCard ( );
          }
        }
        else
        {
          this.resetCard ( );
        }
      }
      else if ( this.cardData.Location == "bench" )
      {
        if ( newArea ( this.cardData ) == "battle" )
        {
          if ( gameState.IsChallenging &&
               this.cardData.LocalPlayer == false )
          {
            if ( this.moveAsChallenger ( ) )
            {
              endTurn ( );
              this.finalizeMove ( );
            }
            else
            {
              this.resetCard ( );
            }
          }
          else
          {
            if ( this.moveToBattle ( ) )
            {
              this.finalizeMove ( );
            }
            else
            {
              this.resetCard ( );
            }
          }
        }
        else
        {
          this.resetCard ( );
        }
      }
      else if ( this.cardData.Location == "battle" )
      {
        // I don't think you can move these cards
        this.resetCard ( );
      }
      else
      {
        // IDK what this is
        this.resetCard ( );
      }
    }
    else
    {
      this.resetCard ( );
    }
    
  }

  mulliganCard ( )
  {
    var move = new Move ( );
    move.target = this.cardData.CardID;
    move.type = PlayType.mulligan;
    this.turnService.logMove ( move );
  }

  finalizeMove ( )
  {
    this.resizeCard ( );
    this.initX = this.cardData.TopLeftX;
    this.initY = this.cardData.TopLeftY;
  }
  resetCard ( )
  {
    this.cardData.TopLeftX = this.initX;
    this.cardData.TopLeftY = this.initY;
    this.curPosX = this.initX;
    this.curPosY = this.initY;
  }

  resizeCard ( )
  {
    switch (this.cardData.Location) {
      case "bench":
        this.cardData.Height = stageConstants.benchCardSize.height;
        this.cardData.Height = stageConstants.benchCardSize.width;
        break;
      case "hand":
        this.cardData.Height = stageConstants.handCardSize.height;
        this.cardData.Height = stageConstants.handCardSize.width;
        break;
      case "battle":
        this.cardData.Height = stageConstants.battleCardSize.height;
        this.cardData.Height = stageConstants.battleCardSize.width;
        break;
      default:
        break;
    }
  }

  canMakeMove ( )
  {
    return true;
  }

  playSpell ( )
  {
    var id = this.getCardId ( );
    this.cardData.Location = "spell";
    this.cardData.TopLeftY = 0;
    this.cardData.Height = stageConstants.spellCardSize.height;
    this.cardData.Width = stageConstants.spellCardSize.width;

    var move = new Move ( );
    move.target = this.cardData.CardID;
    move.type = PlayType.play;
    this.turnService.logMove ( move );

    return this.moveCardById ( id, this.store.cardInHand1, this.store.spells );

  }

  moveToBench ( )
  {
    var id = this.getCardId ( );
    this.cardData.Location = "bench";
    this.cardData.TopLeftY = 0;

    var move = new Move ( );
    move.target = this.cardData.CardID;
    move.type = PlayType.play;
    this.turnService.logMove ( move );

    return this.moveCardById ( id, this.store.cardInHand1, this.store.cardOnBench1 );
  }

  checkForActions ( )
  {
    this.target.setTargets ( this.cardData.Actions.targets );
  }

  targetCharacter ( targets:Array < string > )
  {
    document.body.style.cursor = "target";
  }

  moveAsChallenger ( )
  {
    var i = getChallengerBattleLaneSlot ( this.cardData );
    if ( i < 0 )
    {
      return false;
    }

    var cCard = getLocalCardByBattleSlot ( i );
    if ( cCard == null )
    {
      return false;
    }
    if ( cCard.IsChallenger == false )
    {
      return false;
    }

    this.cardData.TopLeftX = this.store.cardOnBoard1 [ i ].TopLeftX;
    this.cardData.TopLeftY = 0;
    this.cardData.BattleLocation = i;
    this.cardData.Location = "battle";
    var move = new Move ( );
    move.target = this.cardData.CardID;
    move.refCard = this.store.cardOnBoard1 [ i ].CardID;
    move.type = PlayType.challenge;
    this.turnService.logMove ( move );
    return this.moveCardById ( this.getCardId ( ), this.store.cardOnBench2, this.store.cardOnBoard2, i );
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

      var i = getBattleLaneSlot ( this.cardData );
      if ( i < 0 )
      {
        return false;
      }

      this.cardData.TopLeftX = this.store.cardOnBoard2 [ i ].TopLeftX;
      this.cardData.TopLeftY = 0;
      this.cardData.BattleLocation = i;
      this.cardData.Location = "battle";

      var move = new Move ( );
      move.target = this.cardData.CardID;
      move.refCard = this.store.cardOnBoard2 [ i ].CardID;
      move.type = PlayType.defend;
      this.turnService.logMove ( move );

      return this.moveCardById ( this.getCardId ( ), this.store.cardOnBench1, this.store.cardOnBoard1, i );
    }
    else
    {
      // We are moving to attack
      this.cardData.TopLeftY = 0;
      this.cardData.BattleLocation = this.store.cardOnBoard1.length;
      this.cardData.Location = "battle";
      var r = this.moveCardById ( this.getCardId ( ), this.store.cardOnBench1, this.store.cardOnBoard1 );
      configBattlePlayer ( );
      if ( this.cardData.IsChallenger )
      {
        gameState.IsChallenging = true;
      }
      else
      {
        endTurn ( );
      }

      var move = new Move ( );
      move.target = this.cardData.CardID;
      move.type = PlayType.play;
      this.turnService.logMove ( move );

      return r;
    }
  }

  getCardId ( )
  {
    return this.cardData.CardID;
    // return this.card.id.split ( "-" ) [ 1 ];
  }

  moveCardById ( id:number, arrayFrom:Array<CardClass>, arrayTo:Array<CardClass>, insertIndex:number = -1 )
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
  state:GameState = gameState;
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
