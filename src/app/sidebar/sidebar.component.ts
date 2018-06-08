import { Component, OnInit, Renderer, ElementRef } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { Dashboard_ROUTES, Public_ROUTES } from '../app.menu';
import { take, map } from 'rxjs/operators';

declare var $: any;

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}



@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menus: any[];
    private listTitles: any[];
    location: Location;
    private nativeElement: Node;
    private toggleButton;
    private sidebarVisible: boolean;

    constructor(private renderer: Renderer, private element: ElementRef, private authService: AuthService) {
        //this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }
    ngOnInit() {


        if (this.authService.isAuthenticated)
            this.menus = Dashboard_ROUTES.filter(menuItem => menuItem);
        else
            this.menus = Public_ROUTES.filter(menuItem => menuItem);


        console.log(this.menus);

        var navbar: HTMLElement = this.element.nativeElement;
        //this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        this.toggleButton = document.getElementsByName('btnToggle')[0];
        console.log(this.toggleButton);
    }

    
    clickMenu(url) {
        console.log('url', url);


        var toggleButton = this.toggleButton;
        this.toggleButton.classList.remove('toggled');
        document.body.className = document.body.className.replace('nav-open', '');

        if(url=='/coming-soon' || url=='/whitepaper')
        window.open(url,'_blank')
    }



    sidebarToggle() {
        
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];

        if (this.sidebarVisible == false) {
            setTimeout(function () {
                toggleButton.classList.add('toggled');
            }, 500);
            //body.classList.add('nav-open');

            this.renderer.setElementClass(document.body, 'nav-open', true);

            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            //body.classList.remove('nav-open');


            document.body.className = document.body.className.replace('nav-open', '');
            //this.renderer. (document.body, 'nav-open', true);

        }
    }

    isNotMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    }

}
