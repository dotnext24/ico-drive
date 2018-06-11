import { Component, HostBinding } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'footer-cmp',
    templateUrl: 'footer.component.html',
    styles:[`a:active, a:focus {
        outline: 0;
        border: none;
        -moz-outline-style: none;
      }`]
})

export class FooterComponent{
    currentDate:Date=new Date();
    serverTime : string = this.currentDate.toDateString()+', '+this.currentDate.getHours()+':'+this.currentDate.getMinutes();
}
