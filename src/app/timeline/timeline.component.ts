import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '@services/data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Country } from '@interfaces/country.interface';
import { Location } from '@interfaces/location.interface';
import { ModalCountryMapComponent } from './modal-country-map/modal-country-map.component';

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

  public closeResult: string;

  constructor(
    private data: DataService,
    private modalService: NgbModal) { }

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
      if (visitedCountries.length === 0 || !visitedCountries.find((visitedCountry: Country) => visitedCountry.id === location.countryId)) {
        visitedCountries.push({
          id: location.countryId,
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

  public open(country) {
    const options = {
      centered: true,
      size: 'xl' as 'lg' // Compiler does not accept 'xl'
    };
    const modalRef = this.modalService.open(ModalCountryMapComponent, options);
    let instance = modalRef.componentInstance;
    instance.country = country;
  }

  // Unsubscribe to subscriptions
  ngOnDestroy() {
    this.locationsSubscription.unsubscribe();
  }
}
