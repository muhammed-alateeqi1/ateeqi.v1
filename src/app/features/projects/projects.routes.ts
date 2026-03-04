import { Routes } from '@angular/router';

/**
 * Projects feature routes.
 * Both routes are lazy-loaded to reduce the initial bundle.
 */
export const projectsRoutes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./project-list/project-list.component').then(m => m.ProjectListComponent),
    },
    {
        path: ':slug',
        loadComponent: () =>
            import('./project-detail/project-detail.component').then(m => m.ProjectDetailComponent),
    },
];
