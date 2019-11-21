import { Component, OnInit, Input } from '@angular/core';
import { CardStore, cardStore } from '../card-store/card-store';

@Component({
  selector: 'app-spells',
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.css']
})
export class SpellsComponent implements OnInit {
  @Input ( ) localPlayer:boolean;
  store:CardStore = cardStore;
  constructor() { }

  ngOnInit() {
  }

}
