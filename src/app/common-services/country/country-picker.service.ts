import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import {  Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ICountry } from './country.interface';

@Injectable()
export class CountryPickerService {

  private dataUrl = 'countries.json';
  private data: Observable<ICountry[]> = null;

  public baseUrl = './';

  constructor( private http: HttpClient) {
    this.baseUrl = 'assets/';
    this.data = this.loadData();
  }

  private loadData(): Observable<ICountry[]> {
    var url=this.baseUrl + this.dataUrl;
    console.log(url);

    return this.http.get(this.baseUrl + this.dataUrl)
      .map((res: Response) => { return res || {} })
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      if (error.status === 404) {
        errMsg = 'Error loading countries.json file. Please configure WebPack and load countries.json assets to your root folder';
      }
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  getCountries(): Observable<ICountry[]> {
    return this.data.map(countries => countries.map(country => {
      country.name.native[0] = country.name.native[Object.keys(country.name.native)[0]];
      return country;
    }));
  }


}
