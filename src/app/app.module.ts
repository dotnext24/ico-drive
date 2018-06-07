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
import { AccountComponent } from './account/account.component';
import { ProfileComponent } from './profile/profile.component';
import { MyWalletComponent } from './my-wallet/my-wallet.component';
import { AffiliateComponent } from './affiliate/affiliate.component';
import { CommingSoonComponent } from './comming-soon/comming-soon.component';
import { SupportComponent } from './support/support.component';
import { SettingComponent } from './setting/setting.component';
import { WhitePaperComponent } from './white-paper/white-paper.component';
import { LogoutComponent } from './logout/logout.component';
import { BookComponent } from './book/book.component';
import { NewbookComponent } from './newbook/newbook.component';
import { StorageService } from './storage.service';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BookComponent,
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
    PublicLayoutComponent,
    AccountComponent,
    ProfileComponent,
    MyWalletComponent,
    AffiliateComponent,
    CommingSoonComponent,
    SupportComponent,
    SettingComponent,
    WhitePaperComponent,
    LogoutComponent,
    NewbookComponent,
    HomeComponent
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
  providers: [StorageService, AuthService, AuthGuard,CountryPickerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
