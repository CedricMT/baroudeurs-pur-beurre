import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '@services/data.service';

import { Country } from '@interfaces/country.interface';
import { Location } from '@interfaces/location.interface';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  private locationsSubscription: Subscription;
  public visitedCountries: Country[] = [];

  public isFutureLocationsCollapsed = true;
  public collapseFutureLocationIndex = 0;

  public flagRootPath = 'assets/images/flags/';

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
      this.visitedCountries = this.organizeLocationsByCountry(locations).reverse();
    });
  };

  private organizeLocationsByCountry(locations: Location[]): Country[] {
    // Sort locations
    const sortedLocations = locations.sort((firstLocation, secondLocation) => {
      return firstLocation.id >= secondLocation.id ? 1 : -1;
    });

    // Build visitedCountries array
    const visitedCountries: Country[] = [];
    sortedLocations.forEach((location: Location) => {
      if (visitedCountries.length === 0 || !visitedCountries.find((visitedCountry: Country) => visitedCountry.id === location.id)) {
        visitedCountries.push({
          id: location.id,
          date: location.date,
          duration: location.duration,
          name: location.name,
          flagLabel: location.flagLabel,
          text: location.text,
          countryCode: location.countryCode,
          places: []
        });
      }

      // Add location
      if (location.label !== null && location.gpsCoordinates !== null) {
        visitedCountries[visitedCountries.length - 1].places.push({
          label: location.label,
          gpsCoordinates: location.gpsCoordinates
        });
      }
    });

    return visitedCountries;
  }

  // Unsubscribe to subscriptions
  ngOnDestroy() {
    this.locationsSubscription.unsubscribe();
  }
}
