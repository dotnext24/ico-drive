import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:any={};

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {

    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
    var username=localStorage.getItem('username');
 
    this.http.get('/api/user', httpOptions).subscribe(data => {
      console.log('data',data as Array<any>);
      var arr=data as Array<any>;
     
      this.user = arr.filter(x=>x.username==username)[0];
      console.log(this.user);
    }, err => {
      console.log('err',err);
      if(err.status === 401) {
        this.router.navigate(['login']);
      }
    });
  }

}
