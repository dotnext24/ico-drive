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
  resetData={username:'',password:'',confirmPassword:'',token:''};

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

     //reset-password
     if(task=='reset-password')
     {
       this.state=task;
       this.resetData.username=uname;
       this.resetData.token=token;
       console.log('reset-password',this.state);
     }

     //profile update
     if(task=='confirm-profile-update')
     {
      this.http.post('/api/activate-account',{username:uname,token:token}).subscribe(resp => {
        this.message="Your profile is updated successfully.";

      }, err => {
        this.message = err.error.msg;
      });
     }

    });
     

  }

  sendResetPasswordEmail()
  {
    console.log('this.resetPasswordData',this.resetPasswordData);
    
    this.http.post('/api/reset-password-email',this.resetPasswordData).subscribe(resp => {
      this.message=resp['msg'];
    }, err => {
      this.message = err.error.msg;
    });
  }

  resetPassword()
  {
    console.log('reset Data',this.resetData);
    
    if(this.resetData.confirmPassword==this.resetData.password)
    {

    this.http.post('/api/reset-password',{username:this.resetData.username,password:this.resetData.password,token:this.resetData.token}).subscribe(resp => {
      this.message=resp['msg'];
      console.log('reset Data msg',resp['msg']);
    }, err => {
      console.log('reset Data err',err);
      this.message = err.error.msg;
    });
  }
  else
  {
    this.message = "Password and confirm password not matched.";
  }

  }

  ngOnInit() {
  }

}
