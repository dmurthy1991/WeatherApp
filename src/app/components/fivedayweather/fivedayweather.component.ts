import { Component, Input } from "@angular/core";
import { FivedayweatherService } from "../../shared/fivedayweather.service";
import _ from "lodash";

@Component({
  selector: 'app-fivedayweather',
  templateUrl: './fivedayweather.component.html',
  styleUrls: ['./fivedayweather.component.css']
})
export class FivedayweatherComponent {
  currentCityName = "";
  @Input() set getCityName(value) {
    this.weeklyWeatherArr = [];
    this.currentCityName = value;
    this.newCity(value);
  }
  currentValue = {
    weather: "",
    temp: "",
    wind: "",
    pressure: "",
    date: "",
    day: ""
  };
  arrayOfWeekdays = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

  weeklyWeatherArr = [];
  todayWeather = {};
  constructor(private fiveDayWeather: FivedayweatherService) {}
  

  newCity(city) {
    this.fiveDayWeather.getFiveDayWeather(city).subscribe(async weekWeather => {
      for (let i = 0; i < 5; i++) {
        this.currentValue.temp = weekWeather["list"][i].temp.day;
        this.currentValue.weather = weekWeather["list"][i].weather[0].main;
        this.currentValue.wind =
          weekWeather["list"][i].speed +
          "ms " +
          weekWeather["list"][i].deg +
          " deg";
        this.currentValue.pressure = weekWeather["list"][i].pressure;
        let tempDate = new Date(weekWeather["list"][i].dt * 1000);
        this.currentValue.date = "" + tempDate.getDate();
        this.currentValue.day = this.arrayOfWeekdays[tempDate.getDay()];
        this.weeklyWeatherArr.push(Object.assign({}, this.currentValue));
        if (i == 0) {
          this.todayWeather = await JSON.parse(
            JSON.stringify(this.currentValue)
          );
        }
      }
    });
  }
  refreshWeather() {
    this.weeklyWeatherArr = [];
    this.newCity(this.currentCityName);
  }

}
