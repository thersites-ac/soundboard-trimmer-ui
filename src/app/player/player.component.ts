import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AudioService } from '../shared/audio.service';
import { State } from '../shared/state.model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, OnDestroy {

  stateSubscription: Subscription;

  state: State;

  constructor(public audioService: AudioService) {
    this.state = new State(false, false, false, 0, 0);
    this.stateSubscription = this.audioService.stateChanged.subscribe(state => this.state = state);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.stateSubscription.unsubscribe();
  }

  restart() {
    this.audioService.restart();
  }

  play() {
    this.audioService.play();
  }

  pause() {
    this.audioService.pause();
  }

  advance() {
    this.audioService.advance();
  }

  unimplemented() {
    console.log('remind me to finish this part of the UI');
  }
}
