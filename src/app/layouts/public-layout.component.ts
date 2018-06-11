import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-login-layout',
  template: `
  <div class="wrapper">
  <div *ngIf="isNotMobileMenu()" class="sidebar" data-background-color="white" data-active-color="danger">
      <sidebar-cmp></sidebar-cmp>
  </div>
  <div style="min-height: 100%" class="main-panel-dashboard">
  <navbar-public-cmp>
  <div class="loader-container">
      <div class="loader"></div>
  </div>
</navbar-public-cmp>
      <router-outlet></router-outlet>
     
  </div>
  <footer-cmp></footer-cmp>
</div>
  `,
  styles: []
})
export class PublicLayoutComponent {

  isNotMobileMenu(){
    if($(window).width() > 991){
        return false;
    }
    return true;
}

}