import { Component, Output, OnInit, EventEmitter } from "@angular/core";
import { WeatherlistService } from "../../shared/weatherlist.service";
import _ from "lodash";

@Component({
  selector: 'app-weatherlist',
  templateUrl: './weatherlist.component.html',
  styleUrls: ['./weatherlist.component.css']
})
export class WeatherlistComponent {
  weatherArr = [];
  cityExists: boolean = false;
  refreshWeatherCheck: boolean = false;
  notValidCityName: boolean = false;
  @Output() sendCityName = new EventEmitter();

  constructor(private miniWeather: WeatherlistService) {}

  ngOnInit() {}

  refreshWeather(cityName) {
    this.cityExists = false;
    this.refreshWeatherCheck = true;
    this.getWeather(cityName);
  }

  getWeather(cityName: HTMLInputElement) {
    this.cityExists = false;
    this.notValidCityName = false;
    if (cityName.value) {
      if (
        _.findIndex(this.weatherArr, el => {
          return el["name"].toLowerCase() === cityName.value.toLowerCase();
        }) >= 0
      ) {
        if (!this.refreshWeatherCheck) {
          this.cityExists = true;
        }
      } else {
        this.cityExists = false;
        this.getCityWeather(cityName.value);
      }
    }
    this.refreshWeatherCheck = false;
    cityName.value ? (cityName.value = null) : "";
  }

  getCityWeather(cityName) {
    let currentValue = { name: "", weather: "", temp: "" };

    this.miniWeather.getWeather(cityName).subscribe(
      (res: any) => {
        currentValue.name = res.name;
        currentValue.temp = res.main.temp;
        currentValue.weather = res.weather[0].main;

        if (!this.notValidCityName) {
          this.weatherArr.unshift(currentValue);
        }
      },
      err => {
        if (err.status == 404) {
          this.notValidCityName = true;
        }
      }
    );

    if (this.weatherArr.length > 7) {
      this.weatherArr.pop();
    }
    this.notValidCityName = false;
  }

  deleteCity(index) {
    this.weatherArr.splice(index, 1);
    this.notValidCityName = false;
    this.cityExists = false;
  }

  clearCities() {
    this.weatherArr = [];
    this.notValidCityName = false;
    this.cityExists = false;
  }

  sendCity(cityName) {
    this.sendCityName.emit(cityName);
  }

}
