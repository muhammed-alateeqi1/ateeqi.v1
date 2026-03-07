import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../../core/services/project.service';
import { ProjectCardComponent } from '../../../shared/components/project-card/project-card.component';
import { Project } from '../../../core/models/project.model';
import { SeoService } from '../../../core/seo/seo.service';
import { fadeSlideIn } from '../../../shared/animations/fade.animations';

/**
 * ProjectListComponent
 *
 * Displays all projects in a responsive CSS grid.
 * Route: /projects
 */
@Component({
    selector: 'app-project-list',
    standalone: true,
    imports: [CommonModule, ProjectCardComponent],
    animations: [fadeSlideIn],
    templateUrl: './project-list-component.html',
    styleUrl: './project-list-component.css',
})
export class ProjectListComponent implements OnInit {
    projects: Project[] = [];

    private readonly projectService = inject(ProjectService);
    private readonly seo = inject(SeoService);

    ngOnInit(): void {
        this.seo.update({
            title: 'Projects',
            description: 'Explore projects by Muhammed Al-Ateeqi — Angular dashboards, e-commerce platforms, and AI applications.',
            keywords: 'Angular projects, Frontend portfolio, Web applications',
        });

        this.projectService.getAll().subscribe((projects) => {
            this.projects = projects;
        });
    }

    trackBySlug(_index: number, project: Project): string {
        return project.slug;
    }
}
