import { Component, OnInit, Renderer, Renderer2, ViewEncapsulation, ComponentFactoryResolver } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CardStore, cardStore, configBattlePlayer, loadStore, loadLocalStore } from '../card-store/card-store';
import { CardClass } from '../card-store/card-class';
import { gameState, GamePhase } from '../card-store/game-state';
import { TurnService } from '../turn.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GamePageComponent implements OnInit {

  store:CardStore;

  boardHeight:number;
  boardWidth:number;
  displayedCards:Array< Map < string, any> >;

  constructor( private renderer:Renderer2,
               private componentFactory:ComponentFactoryResolver,
               private turnService: TurnService ) { 
  }

  ngOnInit() {
    // this.sortCards ( );
    loadLocalStore ( );
  }
}
