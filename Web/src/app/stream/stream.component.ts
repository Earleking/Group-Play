import { Component, OnInit } from '@angular/core';
import { GameState, gameState } from '../card-store/game-state';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent implements OnInit {
  state:GameState = gameState;
  constructor() { }

  ngOnInit() {
  }

}
