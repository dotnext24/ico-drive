import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { StorageService } from '../storage.service';
import * as _ from 'lodash';
import { Http,Headers, RequestOptions,Request, RequestMethod } from '@angular/http';
import { window } from 'rxjs/operators/window';
import { Observable } from 'rxjs/Observable';
import { ICountry } from '../common-services/country/country.interface';
import { CountryPickerService } from './../common-services/country/country-picker.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:any={};
  showEditProfile=false;
  message = '';
  error='';
  private dataUrl = 'countries.json';
  private data: Observable<ICountry[]> = null;
  public countries: ICountry[];
  processing: boolean = false;

  setValue: string = 'cca3';
  setName: string = 'name.common';

  constructor(private countryPickerService: CountryPickerService, private http:Http, private storageService:StorageService,  private router: Router) { 
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

  public getValue(obj: ICountry) {
    return _.get(obj, this.setValue);
  }

  public getName(obj: ICountry) {
    return _.get(obj, this.setName);
  }

  ngOnInit() {

    

   var headers= new Headers({ 'Authorization': this.storageService.getItem('jwtToken') });
   var uname=this.storageService.getItem('username');

    this.http.get('/api/user/'+uname,{
      headers:headers }).subscribe(data=>{
       
        this.user=data.json();
      }
      );

  }

  editProfile(event)
  {
    this.showEditProfile=true;
    event.stopPropagation();

  }

}
