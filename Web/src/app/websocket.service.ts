import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { CardStore, cardStore, configBattlePlayer, loadStore, loadLocalStore } from './card-store/card-store';
import { TargetService } from './target.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private serverUrl: string = "http://localhost:3000";
  private socket;
  constructor( private target:TargetService) { 
    console.log('Establishing connection with server...');
    this.socket = io(this.serverUrl); // Establish a connection to the voting server.

    this.socket.on ( "board", ( data ) => {
      target.reset ( );
      console.log ( "got data" );
      console.log ( data );
      loadStore ( data );
    } );
  }

  sendMove ( )
  {
    
  }
}
