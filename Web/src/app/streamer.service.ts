import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class StreamerService {
  private hostUrl: string = "http://localhost:5000";
  private socket;
  constructor()
  {
    this.socket = io(this.hostUrl);
  }
}
