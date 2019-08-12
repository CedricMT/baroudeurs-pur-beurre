import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '@services/data.service';

import { Location } from '@interfaces/location.interface';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  private locationsSubscription: Subscription;
  public locations: Location[] = [];

  public isFutureLocationsCollapsed = true;
  public collapseFutureLocationIndex = 0;

  constructor(private data: DataService) { }

  ngOnInit() {
    // Subscribe to data
    this.subscribeLocations();

    // Update articles and associated comments
    this.data.updateLocations();

  }

  private subscribeLocations(): void {
    this.locationsSubscription = this.data.getLocationsAsObservable().subscribe((locations: Location[]) => {
      // Update locations and collapseFutureLocationIndex
      this.locations = locations.sort((firstLocation: Location, secondLocation: Location) => {
        return firstLocation.id >= secondLocation.id ? 1 : -1;
      });

      this.collapseFutureLocationIndex = this.locations.findIndex(location => location.state === 'future');
    });
  };

  // Unsubscribe to subscriptions
  ngOnDestroy() {
    this.locationsSubscription.unsubscribe();
  }
}
