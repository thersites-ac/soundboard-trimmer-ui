export class State {
  playing: boolean;
  canPlay: boolean;
  canSeek: boolean;
  duration: number;
  relativePosition: number;

  clone(): State {
    return new State(this.playing, this.canPlay, this.canSeek, this.duration, this.relativePosition);
  }

  constructor(playing: boolean,
              canPlay: boolean,
              canSeek: boolean,
              duration: number, 
              relativePosition: number) {
    this.playing = playing;
    this.canPlay = canPlay;
    this.canSeek = canSeek;
    this.duration = duration;
    this.relativePosition = relativePosition;
  }

}
