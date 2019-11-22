import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { CardStore, cardStore, configBattlePlayer, loadStore, loadLocalStore } from './card-store/card-store';
import { TargetService } from './target.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

}
