import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  loginFocusIn ( event ) {
    var element:HTMLInputElement = event.target;
    element.style.setProperty ( "background-color", "transparent" );
  }

  loginFocusOut ( event ) {
    var element:HTMLInputElement = event.target;
    if ( !element.value ) {
      element.style.setProperty ( "background-color", "white" );
    }
  }

}
