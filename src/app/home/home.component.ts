import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private storageService:StorageService,  private router: Router, private authService:AuthService) { }

  ngOnInit() {
    if(this.authService.isAuthenticated)
    this.router.navigate(['dashboard']);
  }

}
