import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
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
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from './header/header.component';
import { ModalCarouselComponent } from './article/modal-carousel/modal-carousel.component';
import { ToastContainerComponent } from './common/toast-container/toast-container.component';
import { LoadingMessageComponent } from './common/loading-message/loading-message.component';
import { IconsDefComponent } from './common/icons-def/icons-def.component';
import { IconComponent } from './common/icon/icon.component';

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
    ModalCountryMapComponent,
    ContactComponent,
    HeaderComponent,
    ModalCarouselComponent,
    ToastContainerComponent,
    LoadingMessageComponent,
    IconsDefComponent,
    IconComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    CountryMapComponent,
    ModalCountryMapComponent,
    ModalCarouselComponent
  ]
})
export class AppModule { }
