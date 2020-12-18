import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class FivedayweatherService {
  endpoint: string = "https://api.openweathermap.org/data/2.5/forecast/daily";
  headers = new HttpHeaders().set("Content-Type", "text/plain");
  apiKey = "c51223c219d6aec8cb8c5210449bd859";
  constructor(private http: HttpClient) {}

  getFiveDayWeather(cityName:any) {
    let API_URL = `${this.endpoint}?q=${cityName}&cnt=5&units=metric&appid=${
      this.apiKey
    }`;

    return this.http.get(API_URL, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      })
    );
  }

}
