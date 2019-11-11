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
    // Retrieve Countries and Locations
    Promise.all([
      this.data.requestCountries().toPromise(),
      this.data.requestLocations().toPromise()
    ]).then((results => {
      const countries = this.organizeLocationsByCountry(results[0], results[1]);
      const visitedCountries = countries.filter((country: Country) => country.places.length > 0);
      this.visitedCountries = visitedCountries.reverse();
    }));
  }

  private organizeLocationsByCountry(countries: Country[], locations: Location[]): Country[] {
    countries.forEach((country: Country) => {
      country.places = [];

      locations.forEach((location: Location) => {
        if (location.countryId === country.id) {
          country.places.push(location);
        }
      });
    });

    return countries;
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
