import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://api.worldbank.org/v2';

  constructor(private http: HttpClient) {}

  getCountryInfo(countryISO2: string): Observable<any> {
    const url = `${this.apiUrl}/country/${countryISO2}?format=json`;
    return this.http.get(url);
  }
}
