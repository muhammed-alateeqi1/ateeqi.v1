import { Routes } from '@angular/router';

/**
 * Root application routes.
 * All feature routes are lazy-loaded for optimal bundle splitting.
 */
export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./features/home/home.component').then(m => m.HomeComponent),
        title: 'Muhammed Al-Ateeqi | Frontend Angular Developer',
    },
    {
        path: 'projects',
        loadChildren: () =>
            import('./features/projects/projects.routes').then(m => m.projectsRoutes),
    },
    {
        path: 'about',
        loadComponent: () =>
            import('./features/about/about.component').then(m => m.AboutComponent),
        title: 'About | Muhammed Al-Ateeqi',
    },
    {
        path: 'contact',
        loadComponent: () =>
            import('./features/contact/contact.component').then(m => m.ContactComponent),
        title: 'Contact | Muhammed Al-Ateeqi',
    },
    {
        path: '**',
        redirectTo: '',
    },
];
