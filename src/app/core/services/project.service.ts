import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay, map } from 'rxjs';
import { Project } from '../models/project.model';

/**
 * ProjectService
 *
 * Responsible for loading and providing project data from the static JSON asset.
 * Uses shareReplay(1) to cache the HTTP request — data is fetched only once.
 */
@Injectable({ providedIn: 'root' })
export class ProjectService {
    private readonly http = inject(HttpClient);

    /** Cached observable of all projects */
    private readonly projects$: Observable<Project[]> = this.http
        .get<Project[]>('/assets/data/projects.json')
        .pipe(shareReplay(1));

    /** Returns all projects */
    getAll(): Observable<Project[]> {
        return this.projects$;
    }

    /** Returns a single project by its slug, or undefined if not found */
    getBySlug(slug: string): Observable<Project | undefined> {
        return this.projects$.pipe(
            map(projects => projects.find(p => p.slug === slug))
        );
    }
}
