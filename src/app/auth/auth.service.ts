import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observer } from 'rxjs';
import { User } from './user';
import { Observable } from 'rxjs/Observable';
import { StorageService } from '../storage.service';

@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn():Observable<boolean> {
    var username=this.storageService.getItem('username');
    
  if(username)
    this.loggedIn.next(true);
  
    return this.loggedIn.asObservable();
  }

  get isAuthenticated(): boolean {
    var username = this.storageService.getItem('username');
   
    console.log('isAuthenticated username', username);
    if (username)
      return true;
    return false;
  }

  constructor(
    private router: Router,
    private storageService:StorageService
  ) {}

  login(user) {
    if (user.userName !== '' && user.password !== '' ) {
      this.loggedIn.next(true);
      this.router.navigate(['/']);
    }
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}