import { LoadingSreenService } from './loading-sreen.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.css']
})
export class LoadingScreenComponent implements OnInit, OnDestroy {
  loading = false;
  loadingSubscription: Subscription;

  constructor(private loadingScreenService: LoadingSreenService) {}

  ngOnInit() {
    this.loadingSubscription = this.loadingScreenService.loadingStatus.subscribe((value) => {
      this.loading = value;
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

}

