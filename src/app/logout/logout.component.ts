import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {

  constructor(private storageService:StorageService, private router: Router,private authService:AuthService) {
    this.storageService.removeItem('jwtToken');
    this.storageService.removeItem('username');
    this.authService.logout();
    this.router.navigate(['login']);

   }

  ngOnInit() {
  }

}
