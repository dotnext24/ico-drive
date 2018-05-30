import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarPublicComponent } from './navbar-public.component';

@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [ NavbarPublicComponent ],
    exports: [ NavbarPublicComponent ]
})

export class NavbarPublicModule {}
