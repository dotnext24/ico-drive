import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  books: any;
  constructor(private storageService:StorageService, private http: HttpClient, private router: Router) { }
  
  logout() {
    this.storageService.removeItem('jwtToken');
    this.storageService.removeItem('username');
    this.router.navigate(['login']);
  }
  ngOnInit() {
    console.log("storageService.getItem('jwtToken')",this.storageService.getItem('jwtToken'));
    
    if(!this.storageService.getItem('jwtToken'))
    {
      this.router.navigate(['login']);
    }
    
    let params = new HttpParams().set('isbn','gtr');

    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': this.storageService.getItem('jwtToken') }),
      params: {'isbn':'gtr'}
    };
    
    this.http.get('/api/book', httpOptions).subscribe(data => {
      console.log('data',data);
      this.books = data;
      console.log(this.books);
    }, err => {
      console.log('err',err);
      if(err.status === 401) {
        this.router.navigate(['login']);
      }
    });
  }

  

}
