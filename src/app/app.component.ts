import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AudioService } from './shared/audio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'soundboard';

  subscription: Subscription;

  constructor(audioService: AudioService,
              route: ActivatedRoute) {
    this.subscription = route.queryParams.pipe(
      filter(params => params.uri && params.key && params.prefix)
    ).subscribe(params => {
      const uri = params.uri;
      const prefix = params.prefix;
      const key = params.key;
      audioService.init(uri, prefix, key);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
