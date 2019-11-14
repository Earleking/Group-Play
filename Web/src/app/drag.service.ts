import { Injectable } from '@angular/core';
import { CardStore, cardStore } from './card-store/card-store';
import { CardClass } from './card-store/card-class';

@Injectable({
  providedIn: 'root'
})
export class DragService {
  private mana: number = 999999;
  private LANE_CAPACITY: number = 6;

  constructor() {
  }

  moveCard(card: CardClass, newX: number, newY: number): boolean {
    let laneNumber = Math.floor(newY / cardStore.benchSize.height); // assuming all sections are same height
    if (laneNumber > 4 || laneNumber === 0) {
      return false; // can't place on enemy's side.
    }
    if (!card.LocalPlayer) {
      return false;
    }

    let laneSlot = Math.floor(newX / cardStore.benchSize.width); // the index of the array to put card in


    // Battle array always needs to be size 6 so we can place cards in whatever position
    // The other arrays, we force the order as queues.
    switch (laneNumber) {
      case 1:
        // Card in hand, not a spell, putting on bench
        if (card.Location === "Hand"
          && card.manaCost < this.mana
          && card.cardType !== 'Spell'
          && cardStore.cardOnBench1.length < this.LANE_CAPACITY) {
          return true;
        }
        break;
      case 2:
        // Attack/Defence Logic
        // Max 6 cards in bench
        if (card.Location === "Bench"
          && !cardStore.cardOnBoard1[laneSlot] // slot is empty
          && cardStore.cardOnBoard1.length < this.LANE_CAPACITY
          // check opposing cards now.
          && cardStore.cardOnBoard2[laneSlot]
          && cardStore.cardOnBoard2[laneSlot].isTargetable) {
          return true;
        }
        break;
      case 3:
        if (card.Location === "Hand"
          && card.cardType === 'Spell'
          && card.manaCost < this.mana) {
          return true;
        }
        break;
      default:
        break;
    }

    return false;
  }
}
