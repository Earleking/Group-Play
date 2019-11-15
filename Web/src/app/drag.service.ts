import { Injectable } from '@angular/core';
import { CardStore, cardStore } from './card-store/card-store';
import { CardClass, CardTypes, newArea, getBattleLaneSlot, isBattleSlotEmpty, getEnemyCardByBattleSlot } from './card-store/card-class';
import { stageConstants } from './card-store/stage-constants';
import { CardComponent } from './card/card.component';

@Injectable({
  providedIn: 'root'
})
export class DragService {
  private mana: number = 999999;
  private LANE_CAPACITY: number = 6;

  constructor() {
  }

  // TODO: make another function for targetability?
  // OH FUCK SPELLS ARE GONNA BE A BITCH 

  moveCard ( card: CardClass ): boolean {    
    // TODOs:
    //  Account for game phase
    //  Refactor out mana into some playerstate holder?

    if (!card.LocalPlayer) {
      return false;
    }

    let newSection = newArea ( card ); // assuming all sections are same height

    let laneSlot = getBattleLaneSlot ( card ); // the index of the array to put card in

    console.log ( laneSlot );

    // Battle array always needs to be size 6 so we can place cards in whatever position
    // The other arrays, we force the order as queues.
    switch ( newSection ) {
      case "hand":
        // Card in hand, not a spell, putting on bench
        if ( card.Location === "Hand"
          && card.ManaCost < this.mana
          && card.CardType != CardTypes.spell
          && cardStore.cardOnBench1.length < this.LANE_CAPACITY) {
          return true;
        }
        break;
      case "bench":
        // Attack/Defence Logic
        // Max 6 cards in bench
        if ( card.Location === "Bench"
          && isBattleSlotEmpty ( laneSlot ) // slot is empty
          && cardStore.cardOnBoard1.length < this.LANE_CAPACITY )
        {
          if ( getEnemyCardByBattleSlot ( laneSlot ).isTargetable == true )
          {
            return true;
          }
          else if ( getEnemyCardByBattleSlot ( laneSlot ).isTargetable == card.isTargetable )
          {
            return true;
          }
        }
        break;
      case "battle":
        if ( card.Location === "Hand"
          && card.CardType === CardTypes.spell
          && card.ManaCost < this.mana) {
          return true;
        }
        break;
      case "spell":
        if ( card.Location == "hand"
          && card.ManaCost < this.mana )
        {
          return true;
        }
      default:
        break;
    }

    return false;
  }
}
