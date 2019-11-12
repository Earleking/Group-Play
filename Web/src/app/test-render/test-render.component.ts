import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-render',
  templateUrl: './test-render.component.html',
  styleUrls: ['./test-render.component.css']
})
export class TestRenderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.render ( );
  }

  render ( )
  {
    var data = require ( "src/assets/test.json" );
    data = data [ "Rectangles" ];
    var hand:HTMLElement = document.getElementById ( "board" );
    for ( var i in data )
    {
      var card = data [ i ];
      if ( card [ "CardCode"] == "face" )
      {
        continue;
      }
      var e = document.createElement ( "img" );
      e.src = `assets/cards/${card [ "CardCode"] }.png`;
      e.width = card [ "Width" ];
      e.height =  card [ "Height" ];
      e.style.position = "absolute";
      e.style.left = `${card [ "TopLeftX" ]}px`;
      e.style.top = `${card [ "TopLeftY" ]}px`;
      console.log ( e.style );
      hand.appendChild ( e );
    }
  }
}
