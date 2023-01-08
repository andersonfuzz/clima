import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url=`https://api.openweathermap.org/data/2.5/weather?q=`
  private appId=`64a88ca125196128abf2bbe85a9bdadb`

  constructor(private http:HttpClient) { }

  getClimate(city:string):Observable<any>{
   return this.http.get<string[]>(`${this.url}${city}&appid=${this.appId}&lang=pt_br&units=metric`)
  }

  getCountry(country:string):Observable<any>{
    return this.http.get<string[]>(`https://restcountries.com/v3.1/alpha/${country}`)
  }
}
