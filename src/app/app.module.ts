import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FivedayweatherComponent } from './components/fivedayweather/fivedayweather.component';
import { WeatherlistComponent } from './components/weatherlist/weatherlist.component';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { HttpClientModule } from "@angular/common/http";
import { FivedayweatherService } from "./shared/fivedayweather.service";
import { WeatherlistService } from './shared/weatherlist.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    FivedayweatherComponent,
    WeatherlistComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    BrowserAnimationsModule
  ],
  providers: [FivedayweatherService, WeatherlistService],
  bootstrap: [AppComponent]
})
export class AppModule { }
