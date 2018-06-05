import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData = { username:'', password:'' };
  message = '';
  data: any;
  constructor(private http: HttpClient, private router: Router, private authService:AuthService) { }
  
  login() {
   
    this.http.post('/api/signin',this.loginData).subscribe(resp => {
      console.log(resp);
      if(resp['success'])
      {
      
      this.data = resp;
      localStorage.setItem('jwtToken', this.data.token);
      localStorage.setItem('username', this.data.username);
      this.authService.login(this.loginData);
      this.router.navigate(['dashboard']);
      }
      else
      {
        this.message = resp['msg'];
      }

    }, err => {
      this.message = err.error.msg;
    });
  }
  ngOnInit() {
    //this.router.navigate(['dashboard']);
  }

}
