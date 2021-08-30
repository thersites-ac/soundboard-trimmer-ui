import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { State } from './state.model';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private url: string = 'https://ia801504.us.archive.org/3/items/EdSheeranPerfectOfficialMusicVideoListenVid.com/Ed_Sheeran_-_Perfect_Official_Music_Video%5BListenVid.com%5D.mp3';

  private audio: HTMLAudioElement = new Audio(this.url);
  private state: State = new State(false, false, false, 0, 0);

  private start: number = 0;
  private end: number = 0;

  stateChanged: Subject<State> = new Subject();

  constructor() {
    this.audio.load();
    this.audio.onloadeddata = () => {
      this.state.canPlay = true;
      this.state.canSeek = true;
      this.state.duration = this.audio.duration;
      this.end = this.audio.duration;
      this.start = 0;
      this.state.relativePosition = 0;
      this.announceChange();
    };
    this.audio.onseeking = () => {
      this.state.canSeek = false;
      this.state.canPlay = false;
      this.audio.pause();
      this.state.playing = false;
      this.announceChange();
    };
    this.audio.oncanplay = () => {
      this.state.canPlay = true;
      this.announceChange();
    };
    this.audio.onseeked = () => {
      this.state.canSeek = true;
      this.audio.play();
      this.announceChange();
    };
    this.audio.onplaying = () => {
      this.state.playing = true;
      this.announceChange();
    };
    this.audio.onpause = () => {
      this.state.playing = false;
      this.announceChange();
    };
    this.audio.ontimeupdate = () => {
      const newtime = this.audio.currentTime;
      if (newtime > this.end)
        this.goToStart();
      else
        this.state.relativePosition = newtime - this.start;
      this.announceChange();
    };
  }

  play() {
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  restart() {
    this.audio.currentTime = this.start;
  }

  advance() {
    console.log('logic in advance is incomplete');
    const tenth = this.state.duration / 10;
    this.audio.currentTime += tenth;
  }

  resetBoundaries(start: number, end: number): void {
    if (end < start)
      return;
    this.state.duration = end - start;
    this.start = start;
    this.end = end;
    this.goToStart();
    this.announceChange();
  }

  announceChange() {
    this.stateChanged.next(this.state.clone());
  }

  goToStart() {
    this.audio.currentTime = this.start;
    this.state.relativePosition = 0;
    console.log(this.state);
    this.audio.pause();
  }

}
