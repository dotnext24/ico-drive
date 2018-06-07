import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { AuthService } from '../auth/auth.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData = { username:'', password:'',remberme:false };
  message = '';
  data: any;
  constructor(private storageService:StorageService, private http: HttpClient, private router: Router, private authService:AuthService) { }
  processing=false;

  login() {
   this.processing=true;
   console.log('login data',this.loginData)
    this.http.post('/api/signin',this.loginData).subscribe(resp => {
      console.log(resp);
      if(resp['success'])
      {
      
      this.data = resp;
      this.storageService.setItem('jwtToken', this.data.token,!this.loginData.remberme);
      this.storageService.setItem('username', this.data.username,!this.loginData.remberme);
      
      this.authService.login(this.loginData);
      this.router.navigate(['dashboard']);
      }
      else
      {
        this.message = resp['msg'];
      }
this.processing=false;
    }, err => {
      this.message = err.error.msg;
      this.processing=false;
    });
  }
  ngOnInit() {
    if(this.authService.isAuthenticated)
    this.router.navigate(['dashboard']);
  }

}
