// Modules
import { Component, NgZone } from '@angular/core';

// Librairies
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';


@Component({
  selector: 'app-flying-map',
  templateUrl: './flying-map.component.html',
  styleUrls: ['./flying-map.component.scss']
})
export class FlyingMapComponent {

  private map: am4maps.MapChart;
  private cities;

  constructor(private zone: NgZone) { }

  getColorFromTheme(colorName: string): string {
    return getComputedStyle(document.documentElement)
      .getPropertyValue('--' + colorName).trim();
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      const map = am4core.create('chartdiv', am4maps.MapChart);
      map.geodata = am4geodata_worldLow;

      // Use Miller projection
      map.projection = new am4maps.projections.Miller();

      // Set default position and zoom
      map.maxZoomLevel = 1;

      // Load polygon series
      const polygonSeries = new am4maps.MapPolygonSeries();
      polygonSeries.useGeodata = true;
      map.series.push(polygonSeries);

      // Exclude Antarctica
      polygonSeries.exclude = ['AQ'];

      // Configure series
      const polygonTemplate = polygonSeries.mapPolygons.template;
      polygonTemplate.tooltipText = '{name}';
      polygonTemplate.fill = am4core.color('#6c757d');

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
      const hs = polygonTemplate.states.create('hover');
      hs.properties.fill = am4core.color(this.getColorFromTheme('primary'));
      // hs.properties.fill = am4core.color('#17a2b8');

      this.map = map;

      // Add line bullets
      this.cities = map.series.push(new am4maps.MapImageSeries());
      this.cities.mapImages.template.nonScaling = true;

      const city = this.cities.mapImages.template.createChild(am4core.Circle);
      city.radius = 6;
      city.fill = map.colors.getIndex(0).brighten(-0.2);
      city.strokeWidth = 2;
      city.stroke = am4core.color('#fff');

      const paris = this.addCity({ 'latitude': 48.8567, 'longitude': 2.3510 }, 'Paris');
      const bali = this.addCity({ 'latitude': -8.344684, 'longitude': 115.099241 }, 'Bali');
      const hongkong = this.addCity({ 'latitude': 22.317725, 'longitude': 114.171662 }, 'Hong-Kong');
      const pekin = this.addCity({ 'latitude': 39.938263, 'longitude': 116.372727 }, 'Pekin');
      const tokyo = this.addCity({ 'latitude': 35.724440, 'longitude': 139.757212 }, 'Tokyo');
      const hanoi = this.addCity({ 'latitude': 21.029708, 'longitude': 105.834046 }, 'Hanoi');
      const bangkok = this.addCity({ 'latitude': 13.745622, 'longitude': 100.513063 }, 'bangkok');
      const newdeli = this.addCity({ 'latitude': 28.613635, 'longitude': 77.231246 }, 'New-Deli');
      const dodoma = this.addCity({ 'latitude': -6.165972, 'longitude': 35.750897 }, 'Dodoma');
      const windhoek = this.addCity({ 'latitude': -22.560799, 'longitude': 17.063526 }, 'Windhoek');
      const buenosaires = this.addCity({ 'latitude': -34.621671, 'longitude': -58.432224 }, 'Buenos Aires');
      const mexico = this.addCity({ 'latitude': 19.430408, 'longitude': -99.130958 }, 'Mexico');

      // Add lines
      const lineSeries = map.series.push(new am4maps.MapArcSeries());
      lineSeries.mapLines.template.line.strokeWidth = 2;
      lineSeries.mapLines.template.line.strokeOpacity = 0.5;
      lineSeries.mapLines.template.line.stroke = city.fill;
      lineSeries.mapLines.template.line.nonScalingStroke = true;
      lineSeries.mapLines.template.line.strokeDasharray = '1,1';
      lineSeries.zIndex = 10;

      const shadowLineSeries = map.series.push(new am4maps.MapLineSeries());
      shadowLineSeries.mapLines.template.line.strokeOpacity = 0;
      shadowLineSeries.mapLines.template.line.nonScalingStroke = true;
      shadowLineSeries.mapLines.template.shortestDistance = false;
      shadowLineSeries.zIndex = 5;

      this.addLine(paris, bali, lineSeries, shadowLineSeries);
      this.addLine(bali, hongkong, lineSeries, shadowLineSeries);
      this.addLine(pekin, tokyo, lineSeries, shadowLineSeries);
      this.addLine(tokyo, hanoi, lineSeries, shadowLineSeries);
      this.addLine(bangkok, newdeli, lineSeries, shadowLineSeries);
      this.addLine(newdeli, dodoma, lineSeries, shadowLineSeries);
      this.addLine(windhoek, buenosaires, lineSeries, shadowLineSeries);
      this.addLine(mexico, paris, lineSeries, shadowLineSeries);

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
      planeImage.fill = map.colors.getIndex(2).brighten(-0.2);
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



