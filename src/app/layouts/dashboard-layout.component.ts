import { Component } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-home-layout',
  templateUrl: 'dashboard-layout.component.html',
  styles: []
})
export class DashboardLayoutComponent {

  isNotMobileMenu(){
    if($(window).width() > 991){
        return false;
    }
    return true;
}
}