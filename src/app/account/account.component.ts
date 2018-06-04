import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  message = '';
  processing:false;
  state='';
  resetPasswordData={to:''};

  constructor(private http: HttpClient, private route: ActivatedRoute,
    private router: Router,) { 
      
      this.route.params.subscribe(params => {
      var task=params['task'];
      var uname=params['uname'];
      var token=params['token'];
      console.log(task,uname,token);
         
     //activation
     if(task=='activate')
     {
      this.http.post('/api/activate-account',{username:uname,token:token}).subscribe(resp => {
        this.message=resp['msg'];
      }, err => {
        this.message = err.error.msg;
      });
     }

     //reset request
     if(task=='reset-password-request')
     {
       this.state=task;
     }
    });
     

  }

  sendResetPasswordEmail()
  {
    
    this.http.post('/api/reset-password-email',this.resetPasswordData).subscribe(resp => {
      this.message=resp['msg'];
    }, err => {
      this.message = err.error.msg;
    });
  }

  ngOnInit() {
  }

}
