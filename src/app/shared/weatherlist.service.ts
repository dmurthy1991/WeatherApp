import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Constants } from "./constants";
import {
  HttpClient,
  HttpHeaders,
} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WeatherlistService {
  headers = new HttpHeaders().set("Content-Type", "text/plain");
  constructor(private http: HttpClient) {}

  getWeather(cityName:any) {
    let API_URL = `${Constants.API_URL.weatherlist}?q=${cityName}&units=metric&appid=${Constants.API_URL.api_key}`;

    return this.http.get(API_URL, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      })
    );
  }
}
