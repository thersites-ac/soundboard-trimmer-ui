import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AudioService } from '../shared/audio.service';
import { take } from 'rxjs/operators';
import { State } from '../shared/state.model';

@Component({
  selector: 'app-trimmer',
  templateUrl: './trimmer.component.html',
  styleUrls: ['./trimmer.component.css']
})
export class TrimmerComponent {

  start: number = 0;
  end: number = 0;
  maxDuration: number = 0;

  constructor(public audioService: AudioService) {
    this.audioService.stateChanged.pipe(
      take(2)
    ).subscribe(state => {
      this.maxDuration = (state as State).duration;
      this.end = this.maxDuration;
    });
  }

  trim() {
    console.log('trimming:', this.start, this.end);
    if (this.start < this.end)
      this.audioService.resetBoundaries(this.start, this.end);
  }

  submit(form: NgForm) {
    console.log(form);
  }


}
