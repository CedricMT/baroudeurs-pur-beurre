// Modules
import { Component, NgZone, Input, Output, OnInit } from '@angular/core';

// Librairies
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4geodata_worldHigh from "@amcharts/amcharts4-geodata/worldHigh";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

// Interfaces
import { Country } from '@interfaces/country.interface';
import { Location } from '@interfaces/location.interface';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-country-map',
  templateUrl: './country-map.component.html',
  styleUrls: ['./country-map.component.scss']
})
export class CountryMapComponent implements OnInit {

  @Input() country: Country;
  @Input() lightboxMode: boolean;

  private map: am4maps.MapChart;
  public chartdivId: string;

  constructor(private zone: NgZone) { }

  getColorFromTheme(colorName: string): string {
    return getComputedStyle(document.documentElement)
      .getPropertyValue('--' + colorName).trim();
  }

  ngOnInit(): void {
    const suffix = this.lightboxMode ? '-lightbox' : '';
    this.chartdivId = "chartdiv" + this.country.id + suffix;
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      // Create charts
      const map = am4core.create(this.chartdivId, am4maps.MapChart);

      // Load map geodata
      try {
        map.geodata = this.lightboxMode ? am4geodata_worldHigh : am4geodata_worldLow;
      }
      catch (e) {
        map.raiseCriticalError(new Error("Map geodata could not be loaded. Please download the latest <a href=\"https://www.amcharts.com/download/download-v4/\">amcharts geodata</a> and extract its contents into the same directory as your amCharts files."));
      }

      // Initiate map
      map.projection = new am4maps.projections.Miller();
      map.padding(10, 20, 10, 20);
      map.minZoomLevel = 0.9;
      map.zoomLevel = 0.9;
      map.maxZoomLevel = this.lightboxMode ? 5 : 1;

      if (!this.lightboxMode) {
        // Disable scrolling on map container
        map.chartContainer.wheelable = false;

        // Disable drag
        map.seriesContainer.hitOptions.doubleHitTime = 0; // Handle drag effect on double click
        map.seriesContainer.draggable = false;
        map.seriesContainer.resizable = false;
      } else {
        // Zoom control
        const zoomControl = map.zoomControl = new am4maps.ZoomControl();
        zoomControl.properties.fill = am4core.color("#FFFFFF");
        // zoomControl.padding(7, 5, 7, 5);
        zoomControl.width = 50;
        zoomControl.background.fill = am4core.color("#FFFFFF");
        // zoomControl.background.stroke = am4core.color("#FFFFFF");

        let homeButton = new am4core.Button();
        homeButton.events.on("hit", function () {
          map.goHome();
        });

        homeButton.icon = new am4core.Sprite();
        homeButton.padding(7, 5, 7, 5);
        homeButton.width = 30;
        homeButton.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
        homeButton.marginBottom = 10;
        homeButton.parent = map.zoomControl;
        homeButton.insertBefore(map.zoomControl.plusButton);
      }

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
      circle.radius = 3;
      circle.fill = am4core.color(this.getColorFromTheme('warning'));
      circle.stroke = am4core.color("#FFFFFF");
      circle.strokeWidth = 1;
      circle.nonScaling = true;
      circle.tooltipText = "{title}";

      // Set property fields
      imageSeriesTemplate.propertyFields.latitude = "latitude";
      imageSeriesTemplate.propertyFields.longitude = "longitude";

      // Add locations
      this.country.locations.forEach((location: Location) => {
        const coords: string[] = location.gpsCoordinates.split(',');

        imageSeries.addData({
          longitude: Number(coords.pop()),
          latitude: Number(coords.pop()),
          title: location.label
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
