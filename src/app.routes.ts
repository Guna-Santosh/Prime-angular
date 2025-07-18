import { Routes } from '@angular/router';

// import { LayoutComponent } from './app/Layout/Components/layout/layout.component';
// import { DashboardComponent } from './app/Pages/dashboard/dashboard.component';

export const appRoutes: Routes = [
    {
        path: '',
        // component: LayoutComponent,
        // children: [
        //     { path: '', component: DashboardComponent },
        //     // { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
        //     // { path: 'documentation', component: Documentation },
        //     // { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
        // ]
    },
    // {
    //     path: '',
    //     redirectTo: 'landing',
    //     pathMatch: 'full'
    // },
    // {
    //     path: 'landing',
    //     component: LayoutComponent
    // },
    // { path: 'notfound', component: Notfound },
    // { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    // { path: '**', redirectTo: '/notfound' }
];
