import { Injectable } from '@angular/core';
import { cardStore } from './card-store/card-store';
import { CardClass } from './card-store/card-class';
import { Move, PlayType } from './card-store/turn-manager';

@Injectable({
  providedIn: 'root'
})
export class TargetService {
  targets:Array<string>;
  constructor ( ) { }

  setTargets ( targets:Array<string> )
  {
    this.targets = targets;
    this.target ( );
  }

  target (  )
  {
    document.body.style.cursor = "crosshair";
    switch (this.targets [ 0 ]) {
      case "enemy":
        for ( var card of cardStore.cardOnBench2 )
        {
          card.Selectable = true;
          card.Outline = "selectable";
        }
        for ( var card of cardStore.cardOnBoard2 )
        {
          card.Selectable = true;
          card.Outline = "selectable";
        }
        break;
      case "ally":
        for ( var card of cardStore.cardOnBench1 )
        {
          card.Selectable = true;
          card.Outline = "selectable";
        }
        for ( var card of cardStore.cardOnBoard1 )
        {
          card.Selectable = true;
          card.Outline = "selectable";
        }
      default:
        break;
    }
  }

  selectedTarget ( )
  {
    switch ( this.targets [ 0 ] ) {
      case "enemy":
        for ( var card of cardStore.cardOnBench2 )
        {
          card.Selectable = false;
          card.Outline = "";
        }
        for ( var card of cardStore.cardOnBoard2 )
        {
          card.Selectable = false;
          card.Outline = "";
        }
        break;
      case "ally":
        for ( var card of cardStore.cardOnBench1 )
        {
          card.Selectable = false;
          card.Outline = "";
        }
        for ( var card of cardStore.cardOnBoard1 )
        {
          card.Selectable = false;
          card.Outline = "";
        }
      default:
        break;
    }
    document.body.style.cursor = "default";
    this.targets.splice ( 0, 1 );
    if ( this.targets.length > 0 )
    {
      this.target ( );
    }
  }

  reset ( )
  {
    for ( var card of cardStore.cardOnBench2 )
    {
      card.Selectable = false;
      card.Outline = "";
    }
    for ( var card of cardStore.cardOnBoard2 )
    {
      card.Selectable = false;
      card.Outline = "";
    }
    for ( var card of cardStore.cardOnBench1 )
    {
      card.Selectable = false;
      card.Outline = "";
    }
    for ( var card of cardStore.cardOnBoard1 )
    {
      card.Selectable = false;
      card.Outline = "";
    }
    this.targets = [ ];
  }
}
