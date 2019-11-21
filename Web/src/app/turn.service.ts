import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { PlayType, Move } from './card-store/turn-manager';

import * as io from 'socket.io-client';
import { TargetService } from './target.service';
import { loadStore } from './card-store/card-store';

@Injectable({
  providedIn: 'root'
})
export class TurnService {
  count: number; // DON'T QUESTION MY METHODS
  private canMove: boolean = true;
  private log: Array<Move> = []; // I'm assuming the moves are encoded as numbers, as detailed on card #15. Change if desired.
  private webUrl: string = "http://localhost:3000";
  private socket;

  constructor(private target: TargetService ) { 
    console.log('Establishing connection with server...');
    this.socket = io(this.webUrl); // Establish a connection to the voting server.

    this.socket.on ( "board", ( data ) => {
      target.reset ( );
      console.log ( "got data" );
      console.log ( data );
      this.enableCanMove(); // temporarily do this here

      loadStore ( data.data );
    } );
  }

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
  enableCanMove() {
    // Allow the player to move, and start up the timer again.
    this.canMove = true;
    if ( this.count == undefined )
    {
      this.count = 0;
    }
    else
    {
      this.count++; // TEMPORARY - JUST TO RESET THE TIMER UNTIL WE GET submitMove FINISHED
    }
  }

  // Call this whenever a card is moved -- log moves, send moves to server.
  logMove(move: Move) {
    this.log.push(move);
  }

  private submitMove() {
    if(this.log.length > 0) {
      this.sendMove ( this.log );
      // temporarily represent move submission as just logging the move.
      console.log ( this.log );
    }
    this.log = [ ];
  }

  sendMove ( data )
  {
    this.socket.emit ( "submit", data );
  }
}
