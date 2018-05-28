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
import { LoginLayoutComponent } from './layouts/login-layout.component';
import { HomeLayoutComponent } from './layouts/home-layout.component';
import { AuthGuard } from './auth/auth.guard';

export const AppRoutes: Routes = [

    {
        path: '',
        component: HomeLayoutComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: DashboardComponent
          }
        ]
      },
      
      {
        path: '',
        component: LoginLayoutComponent,
        children: [
          {
            path: 'login',
            component: LoginComponent
          }
        ]
      },
      { path: '**', redirectTo: 'login' }

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
