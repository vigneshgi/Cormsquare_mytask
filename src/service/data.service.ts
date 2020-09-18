import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = "https://recruit.cormsquare.com";
  private cache: any = {};

  constructor(private http: HttpClient) { }


  getData(route, refresh) {
    if (this.dataForRouteIsCached(route, refresh)) {
      return Observable.of(this.cache[route]);
    } else { // no cached data or refresh requested
      return this.http.get<any>(this.baseUrl + route).map(response => {
        this.cache[route] = response;
        return response;
      });
    }
  }
  
  dataForRouteIsCached(route, refresh) {
    return this.cache[route] && (refresh === false || refresh === undefined);
  }
}
