import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { ICountry } from '../common-services/country/country.interface';
import { CountryPickerService } from '../common-services/country/country-picker.service';
import * as _ from 'lodash';
import { resetFakeAsyncZone } from '@angular/core/testing';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupData = {email:'', username: '', password: '', country: '', firstname: '', lastname: '' };
  message = '';
  error='';
  private dataUrl = 'countries.json';
  private data: Observable<ICountry[]> = null;
  public countries: ICountry[];
  processing: boolean = false;

  setValue: string = 'cca3';
  setName: string = 'name.common';

  constructor(private countryPickerService: CountryPickerService, private http: HttpClient, private router: Router) {
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
  
    

    this.processing = true;

    console.log("this.signupData", this.signupData);
    this.http.post('/api/signup', this.signupData).subscribe(resp => {
      console.log(resp['msg']);
      if (resp['success']) {
        
        let emailData = {
          name: this.signupData.firstname + ' ' + this.signupData.lastname,
          link: 'activation link',
          to: this.signupData.email
        }

         this.http.post('/api/activation-email', emailData).subscribe(resp => {

          console.log('/api/activation-email', resp);
          this.processing = false; 
          this.message = "Account activation email has been sent to "+emailData.to+". Please check your inbox to activate your account.";         
          //this.router.navigate(['login']);
        }, err => {
          this.processing = false;
        })      

      }
      else {
        this.message = resp['msg'];
        this.processing = false;
      }
    }, err => {
      this.message=this.error = err.error.msg;
      this.processing = false;
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
