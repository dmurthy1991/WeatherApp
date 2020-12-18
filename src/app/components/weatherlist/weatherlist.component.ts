import { Component, Output, EventEmitter } from "@angular/core";
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
  @Output() sendCityName:EventEmitter<String> = new EventEmitter();

  constructor(private miniWeather: WeatherlistService) {}

  // this method is used to clear all the cities from the list.
  clearCities() {
    this.weatherArr = [];
    this.notValidCityName = false;
    this.cityExists = false;
  }

  // this method is used to delete one particular city.
  deleteCity(index) {
    this.weatherArr.splice(index, 1);
    this.notValidCityName = false;
    this.cityExists = false;
  }

// this method is responsible for getting weather data from api.
  getCityWeather(cityName) {
    let currentValue = { name: "", weather: "", temp: "" };

    // calling weather api using angular services.
    this.miniWeather.getWeather(cityName).subscribe(
      (res: any) => {
        currentValue.name = res.name;
        currentValue.temp = res.main.temp;
        currentValue.weather = res.weather[0].main;

        // if the city name doesn't exist then adding to rop of stack.
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

    // if the list of cities is beyond 8 then removing a city from bottom of stack.
    if (this.weatherArr.length > 7) {
      this.weatherArr.pop();
    }
    this.notValidCityName = false;
  }

  // this method is used to check if the city name searched already exists in the list.
  getWeather(cityName: HTMLInputElement) {
    this.cityExists = false;
    this.notValidCityName = false;
    if (cityName.value) {
      // checking if the city searched already exists in the list
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

  // this method is used to refresh one particular city.
  refreshWeather(cityName) {
    this.cityExists = false;
    this.refreshWeatherCheck = true;
    this.getWeather(cityName);
  }

  // this method is used to send the city name to sibling component for detailed weather report.
  sendCity(cityName) {
    this.sendCityName.emit(cityName);
  }

}
