import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private url = `https://api.openweathermap.org/data/2.5/weather?q=`;
  private appId = `64a88ca125196128abf2bbe85a9bdadb`;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  getClimate(city: string): Observable<any> {
    return this.http
      .get<string[]>(
        `${this.url}${city}&appid=${this.appId}&lang=pt_br&units=metric`
      )
      .pipe(
        map((obj) => obj),
        catchError((e) => this.erronio(e))
      );
  }

  erronio(e: any): Observable<any> {
    this.showMessage('cidade não encontrada')
    return EMPTY
  }
  getCountry(country: string): Observable<any> {
    return this.http.get<string[]>(
      `https://restcountries.com/v3.1/alpha/${country}`
    );
  }

  showMessage(msg: string) {
    if (msg === '') {
      return;
    } else {
      this.snackBar.open(msg, 'x', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['error'],
      });
    }
  }

}
