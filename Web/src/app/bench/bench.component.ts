import { Component, OnInit } from '@angular/core';
import { CardStore, cardStore } from '../card-store/card-store';

@Component({
  selector: 'app-bench',
  templateUrl: './bench.component.html',
  styleUrls: ['./bench.component.css']
})
export class BenchComponent implements OnInit {
  store:CardStore = cardStore;

  constructor() { 
    console.log ( this.store );
  }

  ngOnInit() {
  }

}
