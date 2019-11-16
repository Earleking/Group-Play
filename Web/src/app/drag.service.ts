import { Injectable } from '@angular/core';
import { CardStore, cardStore } from './card-store/card-store';
import { CardClass, CardTypes, newArea, getBattleLaneSlot, isBattleSlotEmpty, getEnemyCardByBattleSlot } from './card-store/card-class';
import { stageConstants } from './card-store/stage-constants';
import { CardComponent } from './card/card.component';
import { gameState, GamePhase } from './card-store/game-state';

@Injectable({
  providedIn: 'root'
})
export class DragService {
  private LANE_CAPACITY: number = 6;

  constructor() {
  }

  // TODO: make another function for targetability?
  // OH FUCK SPELLS ARE GONNA BE A BITCH 

  moveCard ( card: CardClass ): boolean {
    // TODOs:
    //  Account for game phase
    //  Refactor out mana into some playerstate holder?

    if ( !card.LocalPlayer && gameState.IsChallenging == false ) {
      return false;
    }

    let newSection = newArea ( card ); // assuming all sections are same height
    let laneSlot = getBattleLaneSlot ( card ); // the index of the array to put card in
    console.log ( newSection );
    // Battle array always needs to be size 6 so we can place cards in whatever position
    // The other arrays, we force the order as queues.
    switch ( newSection ) {
      case "bench":
        // Card in hand, not a spell, putting on bench
        if ( card.Location === "hand"
          && card.ManaCost < gameState.Mana
          && card.CardType != CardTypes.spell
          && cardStore.cardOnBench1.length < this.LANE_CAPACITY 
          && gameState.Phase === GamePhase.default ) {
          return true;
        }
        break;
      case "battle":
        // Attack/Defence Logic
        // Max 6 cards in bench
        if ( card.Location === "bench"
          && card.CardType === CardTypes.unit
          && cardStore.cardOnBoard2.length > 0
          && isBattleSlotEmpty ( laneSlot ) // slot is empty
          && cardStore.cardOnBoard1.length < this.LANE_CAPACITY )
        {
          if ( getEnemyCardByBattleSlot ( laneSlot ).IsTargetable == true )
          {
            return true;
          }
          else if ( getEnemyCardByBattleSlot ( laneSlot ).IsTargetable == card.IsTargetable )
          {
            return true;
          }
        }
        if ( card.Location === "bench" 
          && card.CardType === CardTypes.unit 
          && gameState.AttackToken === true
          && cardStore.cardOnBoard1.length < this.LANE_CAPACITY )
        {
          return true;
        }
        console.log ( card );
        if ( card.Location === "bench" 
          && card.CardType === CardTypes.unit
          && card.LocalPlayer === false
          && gameState.IsChallenging === true )
        {
          return true;
        }
        break;
      // case "battle":
      //   // Move to defend
      //   if ( card.Location === "bench"
      //     && card.CardType === CardTypes.unit
      //     && cardStore.cardOnBoard2.length > 0 ) {
      //     return true;
      //   }
      //   // Move to attack
      //   if ( card.Location === "bench"
      //     && card.CardType === CardTypes.unit
      //     && cardStore.cardOnBoard2.length === 0
      //     && this.attackToken === true ) {
      //     return true;
      //   }
      //   break;
      case "spell":
        if ( card.Location == "hand"
          && card.CardType === CardTypes.spell
          && card.ManaCost < gameState.Mana )
        {
          return true;
        }
      default:
        break;
    }

    return false;
  }
}

