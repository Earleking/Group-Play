import { Component, OnInit } from '@angular/core';
import { cardStore } from '../card-store/card-store';

@Component({
  selector: 'app-mulligan',
  templateUrl: './mulligan.component.html',
  styleUrls: ['./mulligan.component.css']
})
export class MulliganComponent implements OnInit {
  store = cardStore;
  constructor() { }

  ngOnInit() {
  }

}
