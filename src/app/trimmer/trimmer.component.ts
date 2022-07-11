import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AudioService } from '../shared/audio.service';
import { take } from 'rxjs/operators';
import { State } from '../shared/state.model';
import { TrimmerResponse } from '../shared/trimmerResponse.model';

@Component({
  selector: 'app-trimmer',
  templateUrl: './trimmer.component.html',
  styleUrls: ['./trimmer.component.css']
})
export class TrimmerComponent {

  title: string = '';
  trimmerResponse: TrimmerResponse = new TrimmerResponse(0, '');
  command: string = '';

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
    this.audioService.trimmerResponse.subscribe(state => this.trimmerResponse = state)
  }

  trim() {
    if (this.start < this.end)
      this.audioService.resetBoundaries(this.start, this.end);
  }

  submit(form: NgForm) {
    const data = form.value
    this.command = data.title;
    this.audioService.trim(data.start, data.end, this.command);
  }


}
