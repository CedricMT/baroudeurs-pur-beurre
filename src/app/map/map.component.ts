// Modules
import { Component, OnInit, NgZone } from '@angular/core';

// Librairies
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  private map: am4maps.MapChart;

  constructor(private zone: NgZone) { }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      let map = am4core.create("chartdiv", am4maps.MapChart);
      map.geodata = am4geodata_worldLow;

      // Use Miller projection
      map.projection = new am4maps.projections.Miller();

      // Load polygon series
      let polygonSeries = new am4maps.MapPolygonSeries();
      polygonSeries.useGeodata = true;
      map.series.push(polygonSeries);

      // Configure series
      let polygonTemplate = polygonSeries.mapPolygons.template;
      polygonTemplate.tooltipText = "{name}";
      polygonTemplate.fill = am4core.color("#6c757d");

      // Create hover state and set alternative fill color
      let hs = polygonTemplate.states.create("hover");
      hs.properties.fill = am4core.color("#17a2b8");

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

  ngOnInit() {
  }

}
