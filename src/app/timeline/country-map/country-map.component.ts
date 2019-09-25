// Modules
import { Component, NgZone, Input } from '@angular/core';

// Librairies
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldHigh from "@amcharts/amcharts4-geodata/worldHigh";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

// Interfaces
import { Country } from '@interfaces/country.interface';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-country-map',
  templateUrl: './country-map.component.html',
  styleUrls: ['./country-map.component.scss']
})
export class CountryMapComponent {
  @Input() countries: Country[];

  private map: am4maps.MapChart;
  private map1: am4maps.MapChart;

  private polygonSeries;
  private polygonSeries1;

  private currentIndex;
  private label;

  constructor(private zone: NgZone) { }

  getColorFromTheme(colorName: string): string {
    return getComputedStyle(document.documentElement)
      .getPropertyValue('--' + colorName).trim();
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {

      this.currentIndex = this.countries.length - 1;
      
      // Create charts
      this.map = am4core.create("chartdiv", am4maps.MapChart);
      this.map1 = am4core.create("hiddenchartdiv", am4maps.MapChart);

      // Load map geodata
      try {
        this.map.geodata = am4geodata_worldHigh;
        this.map1.geodata = am4geodata_worldHigh;
      }
      catch (e) {
        this.map.raiseCriticalError(new Error("Map geodata could not be loaded. Please download the latest <a href=\"https://www.amcharts.com/download/download-v4/\">amcharts geodata</a> and extract its contents into the same directory as your amCharts files."));
        this.map1.raiseCriticalError(new Error("Map geodata could not be loaded. Please download the latest <a href=\"https://www.amcharts.com/download/download-v4/\">amcharts geodata</a> and extract its contents into the same directory as your amCharts files."));
      }

      // Initiate map
      this.map.projection = new am4maps.projections.Mercator();
      this.map.padding(10, 20, 10, 20);
      this.map.minZoomLevel = 0.9;
      this.map.zoomLevel = 0.9;
      this.map.maxZoomLevel = 1;

      // Disable scrolling on map container
      this.map.chartContainer.wheelable = false;

      // Disable drag
      this.map.seriesContainer.draggable = false;
      this.map.seriesContainer.resizable = false;

      // Initiate polygonSeries for map
      this.polygonSeries = this.map.series.push(new am4maps.MapPolygonSeries());
      this.polygonSeries.useGeodata = true;
      this.polygonSeries.include = [this.countries[this.countries.length - 1].countryCode];
      this.polygonSeries.mapPolygons.template.fill = am4core.color(this.getColorFromTheme('primary'));

      // Initiate map
      this.map1.projection = new am4maps.projections.Mercator();
      this.map1.padding(10, 20, 10, 20);

      // Initiate polygonSeries for map1
      this.polygonSeries1 = this.map1.series.push(new am4maps.MapPolygonSeries());
      this.polygonSeries1.useGeodata = true;
      this.polygonSeries1.include = [this.countries[this.countries.length - 1].countryCode];

      // Set country label
      this.label = this.map.chartContainer.createChild(am4core.Label);
      this.label.x = 100;
      this.label.y = 100;
      this.label.fill = am4core.color(this.getColorFromTheme('secondary'));
      this.label.fontSize = 35;
      this.label.fontWeight = "bold";
      this.label.text = this.countries[this.countries.length - 1].name;
      this.label.fillOpacity = 0.2;
    });
  }

  /**
   * Change country on map view using morphing from amchart librairy
   */
  changeCountry(event: any) {
    const countryIndex: number = event.target.value;
    let morphToPolygon;

    if (this.currentIndex != countryIndex) {

      // Reset map1 to avoid "EventDispatcher is disposed" error
      this.polygonSeries1.data = [];
      this.map1 = am4core.create("hiddenchartdiv", am4maps.MapChart);
      this.map1.padding(10, 20, 10, 20);
      this.map1.geodata = am4geodata_worldHigh;
      this.map1.projection = new am4maps.projections.Mercator();

      // Update polygonSeries with new country
      this.polygonSeries1.dispose();
      this.polygonSeries1 = this.map1.series.push(new am4maps.MapPolygonSeries());
      this.polygonSeries1.useGeodata = true;
      this.polygonSeries1.include = [this.countries[countryIndex].countryCode];

      // Update curretIndex
      this.currentIndex = countryIndex;

      // Update view when polygonSeries update done
      this.polygonSeries1.events.once("validated", () => {

        // Extract polygon to morph into
        let morphToPolygon = this.polygonSeries1.mapPolygons.getIndex(0);

        if (this.polygonSeries1.mapPolygons.getIndex(0)) {

          let countryPolygon = this.polygonSeries.mapPolygons.getIndex(0);

          // Set primary color to new polygon
          countryPolygon.fill = am4core.color(this.getColorFromTheme('primary'));

          // Set morpher and animations
          let morpher = countryPolygon.polygon.morpher;
          let morphAnimation = morpher.morphToPolygon(morphToPolygon.polygon.points);
          let animation = this.label.animate({ property: "y", to: 1000 }, 300);

          // Trigger label animation once morphing done
          animation.events.once("animationended", () => {
            this.label.text = this.countries[countryIndex].name;
            this.label.y = -50;
            this.label.animate({ property: "y", to: 200 }, 300, am4core.ease.quadOut);
          })
        }
      })
    }
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.map) {
        this.map.dispose();
      }
    });
  }
}
