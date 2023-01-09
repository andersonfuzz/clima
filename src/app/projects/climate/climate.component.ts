import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-climate',
  templateUrl: './climate.component.html',
  styleUrls: ['./climate.component.css'],
})
export class ClimateComponent {
  constructor(private data: DataService) {}
  temperature = '--';
  src = '';
  hideImg = false;
  code = '01d';
  name = '--';
  humidity = 0;
  wind = '--';
  max = '--'; //corrigir temp max e min idendtico temp atual
  min = '--';
  value = '';
  country = '';

  searchCity(city: string) {
    this.data.getClimate(city).subscribe((iten) => {
      let temp = parseInt(iten.main.temp);
      let temp_max = parseInt(iten.main.temp_max);
      let temp_min = parseInt(iten.main.temp_min);
      let speedWind = Number(iten.wind.speed) * 3.6;

      this.temperature = temp.toString();
      this.max = temp_max.toString();
      this.min = temp_min.toString();
      this.name = iten.name;
      this.humidity = iten.main.humidity;
      this.src = iten.sys.country.toLowerCase();
      this.wind = speedWind.toFixed(0);
      this.returnName(this.src);
      this.hideImg = true;
    });
  }
  returnName(acronym: string) {
    this.data.getCountry(acronym).subscribe((iten) => {
      this.country = iten[0].altSpellings[1];
    });
  }

  enterPress($event: any) {
    if ($event.key === 'Enter') {
      this.searchCity(this.value);
    }
  }
}
