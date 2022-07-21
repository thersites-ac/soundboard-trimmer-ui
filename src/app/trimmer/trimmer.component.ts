import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AudioService } from '../shared/audio.service';
import { take, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
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
  guildPrefix: string = '';

  start: number = 0;
  end: number = 0;
  maxDuration: number = 0;

  subscription: Subscription;

  constructor(public audioService: AudioService,
              route: ActivatedRoute) {
    this.audioService.stateChanged.pipe(
      take(2)
    ).subscribe(state => {
      this.maxDuration = (state as State).duration;
      this.end = this.maxDuration;
    });
    this.audioService.trimmerResponse.subscribe(state => this.trimmerResponse = state)
    this.subscription = route.queryParams.pipe(
      filter(params => params.guild_prefix)
    ).subscribe(params => {
      this.guildPrefix = params.guild_prefix;
    });
  }

  trim() {
    if (this.start < this.end)
      this.audioService.resetBoundaries(this.start, this.end);
  }

  submit(form: NgForm) {
    const data = form.value
    this.command = this.guildPrefix + data.title;
    this.audioService.trim(data.start, data.end, this.command);
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
