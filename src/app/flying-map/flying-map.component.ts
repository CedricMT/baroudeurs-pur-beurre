// Modules
import { Component, NgZone, OnInit } from '@angular/core';

// Librairies
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';

// Interfaces
import { DataService } from '@services/data.service';
import { Location } from '@interfaces/location.interface';
import { Country } from '@interfaces/country.interface';

@Component({
  selector: 'app-flying-map',
  templateUrl: './flying-map.component.html',
  styleUrls: ['./flying-map.component.scss']
})
export class FlyingMapComponent implements OnInit {

  private map: am4maps.MapChart;
  private cities;

  public visitedCountries: Country[] = [];
  public plannedCountries: Country[] = [];

  constructor(
    private zone: NgZone,
    private data: DataService) { }

  ngOnInit() {
    // Retrieve Countries and Locations
    Promise.all([
      this.data.requestCountries().toPromise(),
      this.data.requestLocations().toPromise()
    ])
      .then((results => {
        const countries = this.organizeLocationsByCountry(results[0], results[1]);
        this.visitedCountries = countries.filter((country: Country) => country.date !== null);
        this.plannedCountries = countries.filter((country: Country) => country.date === null);
      }))
      .catch((err) => {
        console.error('Error while retrieving data from database.', err);
      })
      .then(() => {
        this.initMap();
      }).catch(err => {
        console.error('Error while initiating map', err);
      });
  }

  private organizeLocationsByCountry(countries: Country[], locations: Location[]): Country[] {
    countries.forEach((country: Country) => {
      country.locations = [];

      // Add locations to country
      locations.forEach((location: Location) => {
        if (location.countryId === country.id) {
          country.locations.push(location);
        }
      });
    });

    return countries;
  }

  getColorFromTheme(colorName: string): string {
    return getComputedStyle(document.documentElement)
      .getPropertyValue('--' + colorName).trim();
  }

  initMap() {
    this.zone.runOutsideAngular(() => {
      // Create map instance
      let map = am4core.create("chartdiv", am4maps.MapChart);

      // Set map definition
      map.geodata = am4geodata_worldLow;

      // Set projection
      map.projection = new am4maps.projections.Miller();

      // Series for World map
      let worldSeries = map.series.push(new am4maps.MapPolygonSeries());
      worldSeries.exclude = ["AQ"];
      worldSeries.useGeodata = true;

      let polygonTemplate = worldSeries.mapPolygons.template;
      polygonTemplate.tooltipText = "{name}";
      // polygonTemplate.fill = map.colors.getIndex(0);
      polygonTemplate.nonScalingStroke = true;

      // Series for visited countries map    
      if (this.visitedCountries.length > 0) {
        const visitedCountriesColor: string = this.getColorFromTheme('primary');
        var visitedCountriesSeries = map.series.push(new am4maps.MapPolygonSeries());
        visitedCountriesSeries.name = 'Visited countries';
        visitedCountriesSeries.useGeodata = true;
        visitedCountriesSeries.include = this.visitedCountries.map((country: Country) => country.countryCode);
        visitedCountriesSeries.fill = am4core.color(visitedCountriesColor);

        let visitedPolygonTemplate = visitedCountriesSeries.mapPolygons.template;
        visitedPolygonTemplate.tooltipText = "{name}";
        visitedPolygonTemplate.fill = am4core.color(visitedCountriesColor);
        visitedPolygonTemplate.nonScalingStroke = true;
        visitedPolygonTemplate.fillOpacity = 0.8;
      }

      // Series for planned countries map  
      if (this.plannedCountries.length > 0) {
        const plannedCountriesColor: string = "#6c757d";
        var plannedCountriesSeries = map.series.push(new am4maps.MapPolygonSeries());
        plannedCountriesSeries.name = 'planned countries';
        plannedCountriesSeries.useGeodata = true;
        plannedCountriesSeries.include = this.plannedCountries.map((country: Country) => country.countryCode);
        plannedCountriesSeries.fill = am4core.color(plannedCountriesColor);

        let plannedCountriesPolygonTemplate = plannedCountriesSeries.mapPolygons.template;
        plannedCountriesPolygonTemplate.tooltipText = "{name}";
        plannedCountriesPolygonTemplate.fill = am4core.color(plannedCountriesColor);
        plannedCountriesPolygonTemplate.nonScalingStroke = true;
        plannedCountriesPolygonTemplate.fillOpacity = 0.8;
      }

      // Disable scrolling on map container
      map.chartContainer.wheelable = false;

      // Disable drag
      map.seriesContainer.draggable = false;
      map.seriesContainer.resizable = false;

      // Retain the auto-zoom functionality when users click on a country
      polygonTemplate.events.on('hit', function (event) {
        if (map.zoomLevel === 1) {
          map.maxZoomLevel = 10;
          map.zoomToMapObject(event.target);
        } else {
          map.goHome();
        }
      });

      // Create hover state and set alternative fill color
      // const hs = polygonTemplate.states.create('hover');
      // hs.properties.fill = am4core.color('#ffffff');

      // Add line bullets
      this.cities = map.series.push(new am4maps.MapImageSeries());
      this.cities.mapImages.template.nonScaling = true;

      const city = this.cities.mapImages.template.createChild(am4core.Circle);
      city.radius = 3;
      city.fill = am4core.color(this.getColorFromTheme('warning'));
      // city.fill = map.colors.getIndex(0).brighten(-0.2);
      city.strokeWidth = 1;
      city.stroke = am4core.color('#fff');

      // Extract flightPoints
      const flightLocations = [];
      this.visitedCountries.forEach((visitedCountry: Country) => {
        visitedCountry.locations.forEach((location: Location) => {
          if (location.flightPoint === '1') {
            flightLocations.push(location);
          }
        });
      });

      // Add cities and lines
      const createdCities = []
      flightLocations.forEach((location: Location) => {
        const coords: string[] = location.gpsCoordinates.split(',');
        const city = this.addCity({ 'latitude': Number(coords[0]), 'longitude': Number(coords[1]) }, location.label);
        createdCities.push({ id: location.id, city: city });
      });

      const lineSeries = map.series.push(new am4maps.MapArcSeries());
      lineSeries.mapLines.template.line.strokeWidth = 2;
      lineSeries.mapLines.template.line.strokeOpacity = 0.5;
      lineSeries.mapLines.template.line.stroke = am4core.color(this.getColorFromTheme('dark'));
      // lineSeries.mapLines.template.line.stroke = city.fill;
      lineSeries.mapLines.template.line.nonScalingStroke = true;
      lineSeries.mapLines.template.line.strokeDasharray = '1,2';
      lineSeries.zIndex = 10;

      const shadowLineSeries = map.series.push(new am4maps.MapLineSeries());
      shadowLineSeries.mapLines.template.line.strokeOpacity = 0;
      shadowLineSeries.mapLines.template.line.nonScalingStroke = true;
      shadowLineSeries.mapLines.template.shortestDistance = false;
      shadowLineSeries.zIndex = 5;

      // Add lines
      flightLocations.forEach((flightLocation: Location) => {
        if (flightLocation.flightDestinationId !== null) {
          const dest = createdCities.find((createdCity) => createdCity.id === flightLocation.flightDestinationId);
          const src = createdCities.find((createdCity) => createdCity.id === flightLocation.id);

          if (dest) {
            this.addLine(src.city, dest.city, lineSeries, shadowLineSeries);
          } else {
            throw new Error('Invalid destination for ' + flightLocation.flightDestinationId + '. Please check that the destination is configure as a flying point.')
          }
        }
      });

      // Add plane
      const plane = lineSeries.mapLines.getIndex(0).lineObjects.create();
      plane.position = 0;
      plane.width = 48;
      plane.height = 48;

      plane.adapter.add('scale', (scale, target) => {
        return 0.5 * (1 - (Math.abs(0.5 - target.position)));
      });

      const planeImage = plane.createChild(am4core.Sprite);
      planeImage.scale = 0.08;
      planeImage.horizontalCenter = 'middle';
      planeImage.verticalCenter = 'middle';
      planeImage.path = 'm2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47';
      // planeImage.fill = map.colors.getIndex(2).brighten(-0.2);
      planeImage.fill = am4core.color(this.getColorFromTheme('dark'));
      planeImage.strokeOpacity = 0;

      const shadowPlane = shadowLineSeries.mapLines.getIndex(0).lineObjects.create();
      shadowPlane.position = 0;
      shadowPlane.width = 48;
      shadowPlane.height = 48;

      const shadowPlaneImage = shadowPlane.createChild(am4core.Sprite);
      shadowPlaneImage.scale = 0.05;
      shadowPlaneImage.horizontalCenter = 'middle';
      shadowPlaneImage.verticalCenter = 'middle';
      shadowPlaneImage.path = 'm2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47';
      shadowPlaneImage.fill = am4core.color('#000');
      shadowPlaneImage.strokeOpacity = 0;

      shadowPlane.adapter.add('scale', (scale, target) => {
        target.opacity = (0.6 - (Math.abs(0.5 - target.position)));
        return 0.5 - 0.3 * (1 - (Math.abs(0.5 - target.position)));
      });

      // Plane animation
      let currentLine = 0;

      function flyPlane() {
        // Get current line to attach plane to
        plane.mapLine = lineSeries.mapLines.getIndex(currentLine);
        plane.parent = lineSeries;
        shadowPlane.mapLine = shadowLineSeries.mapLines.getIndex(currentLine);
        shadowPlane.parent = shadowLineSeries;
        shadowPlaneImage.rotation = planeImage.rotation;

        // Set up animation
        const numLines = lineSeries.mapLines.length;
        if (planeImage.rotation !== 0) {
          planeImage.animate({ to: 0, property: 'rotation' }, 1000).events.on('animationended', flyPlane);
          return;
        }

        // Start the animation
        const animation = plane.animate({
          from: 0,
          to: 1,
          property: 'position'
        }, 5000, am4core.ease.sinInOut);
        animation.events.on('animationended', flyPlane);
        /*animation.events.on('animationprogress', function(ev) {
          let progress = Math.abs(ev.progress - 0.5);
          //console.log(progress);
          //planeImage.scale += 0.2;
        });*/

        shadowPlane.animate({
          from: 0,
          to: 1,
          property: 'position'
        }, 5000, am4core.ease.sinInOut);

        // Increment line and reset if finished
        currentLine++;
        if (currentLine === numLines) {
          currentLine = 0;
        }
      }

      // Go!
      flyPlane();

      this.map = map;
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.map) {
        this.map.dispose();
      }
    });
  }

  addCity(coords, title) {
    const city = this.cities.mapImages.create();
    city.latitude = coords.latitude;
    city.longitude = coords.longitude;
    city.tooltipText = title;
    return city;
  }

  addLine(from, to, lineSeries, shadowLineSeries) {
    const line = lineSeries.mapLines.create();
    line.imagesToConnect = [from, to];
    line.line.controlPointDistance = -0.3;

    const shadowLine = shadowLineSeries.mapLines.create();
    shadowLine.imagesToConnect = [from, to];

    return line;
  }
}
