// Modules
import { Component, NgZone, Input, Output } from '@angular/core';

// Librairies
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
// import am4geodata_worldHigh from "@amcharts/amcharts4-geodata/worldHigh";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

// Interfaces
import { Country } from '@interfaces/country.interface';
import { Place } from '@interfaces/place.interface';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-country-map',
  templateUrl: './country-map.component.html',
  styleUrls: ['./country-map.component.scss']
})
export class CountryMapComponent {

  @Input() country: Country;

  private map: am4maps.MapChart;;

  constructor(private zone: NgZone) { }

  getColorFromTheme(colorName: string): string {
    return getComputedStyle(document.documentElement)
      .getPropertyValue('--' + colorName).trim();
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      // Create charts
      const map = am4core.create("chartdiv" + this.country.id, am4maps.MapChart);

      // Load map geodata
      try {
        // map.geodata = am4geodata_worldHigh;
        map.geodata = am4geodata_worldLow;
      }
      catch (e) {
        map.raiseCriticalError(new Error("Map geodata could not be loaded. Please download the latest <a href=\"https://www.amcharts.com/download/download-v4/\">amcharts geodata</a> and extract its contents into the same directory as your amCharts files."));
      }

      // Initiate map
      map.projection = new am4maps.projections.Miller();
      map.padding(10, 20, 10, 20);
      map.minZoomLevel = 0.9;
      map.zoomLevel = 0.9;
      map.maxZoomLevel = 1;

      // Disable scrolling on map container
      map.chartContainer.wheelable = false;

      // Disable drag
      map.seriesContainer.hitOptions.doubleHitTime = 0; // Handle drag effect on double click
      map.seriesContainer.draggable = false;
      map.seriesContainer.resizable = false;

      // Initiate polygonSeries for map
      const polygonSeries = map.series.push(new am4maps.MapPolygonSeries());
      polygonSeries.useGeodata = true;
      polygonSeries.include = [this.country.countryCode];
      polygonSeries.mapPolygons.template.fill = am4core.color(this.getColorFromTheme('primary'));

      // Create image series
      var imageSeries = map.series.push(new am4maps.MapImageSeries());

      // Create a circle image in image series template so it gets replicated to all new images
      var imageSeriesTemplate = imageSeries.mapImages.template;
      var circle = imageSeriesTemplate.createChild(am4core.Circle);
      circle.radius = 4;
      circle.fill = am4core.color(this.getColorFromTheme('warning'));
      circle.stroke = am4core.color("#FFFFFF");
      circle.strokeWidth = 2;
      circle.nonScaling = true;
      circle.tooltipText = "{title}";

      // Set property fields
      imageSeriesTemplate.propertyFields.latitude = "latitude";
      imageSeriesTemplate.propertyFields.longitude = "longitude";

      // Add places
      this.country.places.forEach((place: Place) => {
        const coords: string[] = place.gpsCoordinates.split(',');

        imageSeries.addData({
          longitude: Number(coords.pop()),
          latitude: Number(coords.pop()),
          title: place.label
        });
      });

      // Add map to global maps array
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
}
