import { Component, OnInit, Input } from '@angular/core';
import { TurnService } from '../turn.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  turnTime: number = 10;
  private timer;

  // I'm using a trigger from the TurnService as the cue to restart the timer
  // When you trigger enableCanMove in TurnService, it's the start of a new round of voting
  // So you restart the timer.
  @Input()
  set trigger(t: number) {
    console.log('Received restart tick from TurnService.');
    this.startTimer();
  }

  constructor(private turnService: TurnService) { }

  ngOnInit() {
  }

  // Function to call to start the timer up again when new game state is received from server
  startTimer() {
    this.turnTime = 10;
    this.timer = setInterval(() => {
      this.turnTime--;

      if(this.turnTime === 0) {
        this.clearTimer();
      }
    }, 1000);
  }

  // To be called if they submit their move
  submitMove() {
    console.log('Submitting move.');
    this.clearTimer();
  }

  // Function to be called when you want to stop the timer.
  clearTimer() {
    clearInterval(this.timer);
    this.turnTime = 0;
    this.turnService.submitTurn();
  }

}
