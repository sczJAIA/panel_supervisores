import { OrderDetailComponent } from './views/order-detail/order-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'base',
        loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/chartjs/chartjs.module').then(m => m.ChartJSModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'logout',
        loadChildren: () => import('./views/logout/logout.module').then(m => m.LogoutModule)
      },
      {
        path: 'dashboard/orderDetails/:orderId/:restaurantId',
        loadChildren: () => import('./views/order-detail/order-detail.module').then(m => m.OrderDetailModule)
      },
      {
        path: 'dashboard/caseDetails/:orderId',
        loadChildren: () => import('./views/case-details/case-details.module').then(m => m.CaseDetailsModule)
      },
      {
        path: 'delivery_list/deliveryList/:orderId',
        loadChildren: () => import('./views/order-detail-letter/order-detail-letter.module').then(m => m.OrderDetailLetterModule),
      },
      {
        path: 'searchUser',
        loadChildren: () => import('./views/search-user/search-user.module').then(m => m.SearchUserModule),
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule)
      },
      {
        path: 'delivery_list',
        loadChildren: () => import('./views/letter-order/letter-order.module').then(m => m.LetterOrderModule)
      },
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/widgets.module').then(m => m.WidgetsModule)
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // relativeLinkResolution: 'legacy',
      useHash: true
    })
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
