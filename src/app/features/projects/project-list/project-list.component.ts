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
    template: `
    <section class="project-list" @fadeSlideIn aria-labelledby="projects-heading">
      <div class="container">
        <header class="section-header">
          <p class="section-eyebrow">Portfolio</p>
          <h1 id="projects-heading" class="section-title">Projects</h1>
          <p class="section-subtitle">
            A selection of work — applications built with attention to performance,
            architecture, and user experience.
          </p>
        </header>

        <div
          class="projects-grid"
          role="list"
          aria-label="Projects"
        >
          <div
            *ngFor="let project of projects; trackBy: trackBySlug"
            role="listitem"
          >
            <app-project-card [project]="project"></app-project-card>
          </div>
        </div>
      </div>
    </section>
  `,
    styles: [`
    .project-list {
      min-height: 100vh;
      padding: 7rem 1.5rem 5rem;
    }

    .container {
      max-width: 1140px;
      margin: 0 auto;
    }

    .section-header {
      text-align: center;
      margin-bottom: 3.5rem;
    }

    .section-eyebrow {
      font-size: 0.8125rem;
      font-weight: 500;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--color-text-muted);
      margin: 0 0 0.75rem;
    }

    .section-title {
      font-size: clamp(1.875rem, 4vw, 2.75rem);
      font-weight: 700;
      color: var(--color-text);
      margin: 0 0 1rem;
      letter-spacing: -0.02em;
    }

    .section-subtitle {
      font-size: 1rem;
      color: var(--color-text-muted);
      line-height: 1.65;
      max-width: 520px;
      margin: 0 auto;
    }

    .projects-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;

      @media (min-width: 640px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (min-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  `],
})
export class ProjectListComponent implements OnInit {
    projects: Project[] = [];

    private readonly projectService = inject(ProjectService);
    private readonly seo = inject(SeoService);

    ngOnInit(): void {
        this.seo.update({
            title: 'Projects',
            description:
                'Explore projects by Muhammed Al-Ateeqi — Angular dashboards, e-commerce platforms, and AI applications.',
            keywords: 'Angular projects, Frontend portfolio, Web applications',
        });

        this.projectService.getAll().subscribe(projects => {
            this.projects = projects;
        });
    }

    trackBySlug(_index: number, project: Project): string {
        return project.slug;
    }
}
