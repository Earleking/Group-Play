import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() card;
  constructor() { 
  }
  
  ngOnInit() {
  }

  cardHovered ( event: MouseEvent )
  {
    var cardT = event.target;
    var card = cardT as HTMLElement;
    card.style.setProperty ( "transform", "scale(1.35)" );
    card.style.setProperty ( "z-index", "11" );
  }

  cardUnHovered ( event:MouseEvent )
  {
    var cardT = event.target;
    var card = cardT as HTMLElement;
    card.style.setProperty ( "transform", "scale(1)" );
    card.style.setProperty ( "z-index", "0" );
  }
}
