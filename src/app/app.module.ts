import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';
import { NguiMapModule} from '@ngui/map';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { UserComponent }   from './user/user.component';
import { TableComponent }   from './table/table.component';
import { TypographyComponent }   from './typography/typography.component';
import { IconsComponent }   from './icons/icons.component';
import { MapsComponent }   from './maps/maps.component';
import { NotificationsComponent }   from './notifications/notifications.component';
import { UpgradeComponent }   from './upgrade/upgrade.component';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout.component';
import { PublicLayoutComponent } from './layouts/public-layout.component';
import { AuthService} from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard'
import { HttpClientModule } from '@angular/common/http';
import { CountryPickerService } from './common-services/country/country-picker.service';
import { NavbarPublicModule } from './shared/navbar-public/navbar-public.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    TableComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    LoginComponent,
    SignupComponent,
    DashboardLayoutComponent,
    PublicLayoutComponent
  ],
  imports: [  

FormsModule,
  HttpClientModule,
  BrowserModule,
    RouterModule.forRoot(AppRoutes),
    SidebarModule,
    NavbarModule,
    NavbarPublicModule,
    FooterModule,
    FixedPluginModule,
    NgbModule.forRoot(),
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'})
   
  ],
  providers: [AuthService, AuthGuard,CountryPickerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
