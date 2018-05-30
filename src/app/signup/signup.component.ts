import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { ICountry } from '../common-services/country/country.interface';
import { CountryPickerService } from '../common-services/country/country-picker.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupData = { username:'', password:'' ,country:'',firstname:'',lastname:''};
  message = '';
  private dataUrl = 'countries.json';
  private data: Observable<ICountry[]> = null;
  public countries: ICountry[];

  setValue: string = 'cca3';
  setName: string = 'name.common';
  constructor(private countryPickerService: CountryPickerService,  private http: HttpClient, private router: Router) {
    this.countryPickerService.getCountries().subscribe(countries => {
      this.countries = countries.sort((a: ICountry, b: ICountry) => {
        let na = this.getName(a);
        let nb = this.getName(b); 
        if (na > nb) {
          return 1;
        }
        if (na < nb) {
          return -1;
        }
        return 0;
      });
    });
   }

  signup() {
      
    this.http.post('/api/signup',this.signupData).subscribe(resp => {
      console.log(resp);
      this.router.navigate(['login']);
    }, err => {
      this.message = err.error.msg;
    });
  }
  public getValue(obj: ICountry) {
    return _.get(obj, this.setValue);
  }

  public getName(obj: ICountry) {
    return _.get(obj, this.setName);
  }
  ngOnInit() {
    
  }

}
