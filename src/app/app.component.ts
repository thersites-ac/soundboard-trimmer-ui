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

  constructor(private audioService: AudioService,
              private route: ActivatedRoute) {
    this.subscription = this.route.queryParams.pipe(
      filter(params => params.uri)
    ).subscribe(params => {
      const uri = atob(params.uri);
      this.audioService.init(uri);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
