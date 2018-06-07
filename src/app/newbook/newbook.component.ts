import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-newbook',
  templateUrl: './newbook.component.html',
  styleUrls: ['./newbook.component.css']
})
export class NewbookComponent implements OnInit {

  bookData = { isbn:'', title:'',author:'',publisher:'' };    
  message = '';
  data: any;
  constructor(private storageService:StorageService, private http: HttpClient, private router: Router) { }
  


  createNewBook()
  {
    if(!this.storageService.getItem('jwtToken'))
    {
      this.router.navigate(['login']);
    }
    
    console.log('this.bookData xddsd',this.bookData)
    
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': this.storageService.getItem('jwtToken') })
    };

    this.http.post('/api/book',this.bookData,httpOptions).subscribe(resp => {
      this.data = resp;  
      this.message="Success";   
      this.router.navigate(['books']);
    }, err => {
      this.message = err.error.msg;
    });
  }

  ngOnInit() {
  }

}
