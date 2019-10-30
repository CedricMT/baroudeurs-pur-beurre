import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FlowComponent } from './flow/flow.component';
import { FooterComponent } from './footer/footer.component';
import { ArticleComponent } from './article/article.component';
import { MapComponent } from './map/map.component';
import { FlyingMapComponent } from './flying-map/flying-map.component';
import { JourneyComponent } from './journey/journey.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { TileComponent } from './home/tile/tile.component';
import { TimelineComponent } from './timeline/timeline.component';
import { CountryMapComponent } from './timeline/country-map/country-map.component';
import { ModalCountryMapComponent } from './timeline/modal-country-map/modal-country-map.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FlowComponent,
    FooterComponent,
    ArticleComponent,
    MapComponent,
    FlyingMapComponent,
    JourneyComponent,
    SideNavComponent,
    TileComponent,
    TimelineComponent,
    CountryMapComponent,
    ModalCountryMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    CountryMapComponent,
    ModalCountryMapComponent
  ]
})
export class AppModule { }
