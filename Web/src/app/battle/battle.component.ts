import { Component, OnInit, Input } from '@angular/core';
import { CardStore, cardStore } from '../card-store/card-store';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {
  @Input ( ) localPlayer:boolean;
  store:CardStore = cardStore;
  constructor() { }

  ngOnInit() {
  }

}
