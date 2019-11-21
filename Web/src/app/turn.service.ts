import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { PlayType, Move } from './card-store/turn-manager';

@Injectable({
  providedIn: 'root'
})
export class TurnService {
  count: number = 0; // DON'T QUESTION MY METHODS
  private canMove: boolean = true; // Move into TurnManager as a global.
  private log: Array<Move> = []; // I'm assuming the moves are encoded as numbers, as detailed on card #15. Change if desired.

  constructor(private socketService: WebsocketService) { }

  getCanMove(): boolean {
    return this.canMove;
  }
  getCount() : number {
    return this.count;
  }

  // These two functions disable and re-enable dragging on the field. Sync with the timer.
  submitTurn() {
    this.canMove = false;
    this.submitMove();
  }
  enableCanMove() { // Move into Websocket -- when you receive move
    // Allow the player to move, and start up the timer again.
    this.canMove = true;
    this.count++; // TEMPORARY - JUST TO RESET THE TIMER UNTIL WE GET submitMove FINISHED
  }

  // Call this whenever a card is moved -- log moves, send moves to server.
  logMove(move: Move) {
    this.log.push(move);
  }

  private submitMove() {
    if(this.log.length > 0) {
      // temporarily represent move submission as just logging the move.
      this.log;
    }
    this.enableCanMove(); // temporarily do this here
  }
}
