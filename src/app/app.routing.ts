import { Routes } from '@angular/router';
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
import { PublicLayoutComponent } from './layouts/public-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout.component';
import { AuthGuard } from './auth/auth.guard';
import { AccountComponent } from './account/account.component';
import { ProfileComponent } from './profile/profile.component';
import { MyWalletComponent } from './my-wallet/my-wallet.component';
import { CommingSoonComponent } from './comming-soon/comming-soon.component';
import { AffiliateComponent } from './affiliate/affiliate.component';
import { SupportComponent } from './support/support.component';
import { SettingComponent } from './setting/setting.component';
import { WhitePaperComponent } from './white-paper/white-paper.component';
import { LogoutComponent } from './logout/logout.component';
import { BookComponent } from './book/book.component';



const PUBLIC_ROUTES: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'account/:task/:uname/:token', component: AccountComponent},
  { path: 'signup', component: SignupComponent }
];

const SECURE_ROUTES: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'book', component: BookComponent, canActivate: [AuthGuard] },

  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'my-wallet', component: MyWalletComponent, canActivate: [AuthGuard] },
  { path: 'comming-soon', component: CommingSoonComponent, canActivate: [AuthGuard] },
  { path: 'affiliate', component: AffiliateComponent, canActivate: [AuthGuard] },
  { path: 'support', component: SupportComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingComponent, canActivate: [AuthGuard] },
  { path: 'whitepaper', component: WhitePaperComponent, canActivate: [AuthGuard] },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] }
];

export const AppRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', component: PublicLayoutComponent, data: { title: 'Members' }, children: PUBLIC_ROUTES },
  { path: '', component: DashboardLayoutComponent, canActivate: [AuthGuard], data: { title: 'Dashboard' }, children: SECURE_ROUTES },
  { path: '**', redirectTo: 'login' }

    // {
    //     path: '',
    //     component: HomeLayoutComponent,
    //     canActivate: [AuthGuard],
    //     children: [
    //       {
    //         path: '',
    //         component: DashboardComponent
    //       }
    //     ]
    //   },
      
    //   {
    //     path: '',
    //     component: LoginLayoutComponent,
    //     children: [
    //       {
    //         path: 'login',
    //         component: LoginComponent
    //       }
    //     ]
    //   },
    //   { path: '**', redirectTo: 'login' }

    // {
    //     path: '',
    //     redirectTo: 'signin',
    //     pathMatch: 'full',
    // },

    // {
    //     path: 'signin',
    //     component: LoginComponent
    // },

    // {
    //     path: 'signup',
    //     component: SignupComponent
    // },

    // {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // },
    // {
    //     path: 'user',
    //     component: UserComponent
    // },
    // {
    //     path: 'table',
    //     component: TableComponent
    // },
    // {
    //     path: 'typography',
    //     component: TypographyComponent
    // },
    // {
    //     path: 'icons',
    //     component: IconsComponent
    // },
    // {
    //     path: 'maps',
    //     component: MapsComponent
    // },
    // {
    //     path: 'notifications',
    //     component: NotificationsComponent
    // },
    // {
    //     path: 'upgrade',
    //     component: UpgradeComponent
    // }
]
