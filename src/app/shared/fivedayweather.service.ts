import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Constants } from "./constants";

import {
  HttpClient,
  HttpHeaders,
} from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class FivedayweatherService {
  headers = new HttpHeaders().set("Content-Type", "text/plain");
  constructor(private http: HttpClient) {}

  getFiveDayWeather(cityName:any) {
    let API_URL = `${Constants.API_URL.fivedayweather}?q=${cityName}&cnt=5&units=metric&appid=${
      Constants.API_URL.api_key
    }`;

    return this.http.get(API_URL, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      })
    );
  }

}
