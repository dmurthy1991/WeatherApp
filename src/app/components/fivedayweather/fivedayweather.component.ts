import { Component, Input } from "@angular/core";
import { FivedayweatherService } from "../../shared/fivedayweather.service";
import _ from "lodash";

@Component({
  selector: 'app-fivedayweather',
  templateUrl: './fivedayweather.component.html',
  styleUrls: ['./fivedayweather.component.css']
})
export class FivedayweatherComponent {
  currentCityName:String = "";
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
  @Input() set getCityName(value) {
    this.weeklyWeatherArr = [];
    this.currentCityName = value;
    this.newCity(value);
  }
  constructor(private fiveDayWeather: FivedayweatherService) {}
  
// this method is responsible for getting weather data from api
  newCity(city) {
    // calling weather api using angular services.
    this.fiveDayWeather.getFiveDayWeather(city).subscribe(async weekWeather => {
      // looping only 5 elements since we know to disply only five days of weather.
      for (let i = 0; i < 5; i++) {

        // setting the values returned from the api to a local variable.

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
        
        // creating an array of 5 days worth of weather data.
        this.weeklyWeatherArr.push(Object.assign({}, this.currentValue));
      }
    });
  }

  /* this method is responsible for refreshing the five day weather by sending city 
   name to newCIty method */
  refreshWeather() {
    this.weeklyWeatherArr = [];
    this.newCity(this.currentCityName);
  }

}
