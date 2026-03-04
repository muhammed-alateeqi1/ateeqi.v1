import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProjectService } from '../../../core/services/project.service';
import { Project } from '../../../core/models/project.model';
import { ImageSliderComponent } from '../../../shared/components/image-slider/image-slider.component';
import { SeoService } from '../../../core/seo/seo.service';
import { fadeSlideIn } from '../../../shared/animations/fade.animations';
import { switchMap, tap } from 'rxjs';

/**
 * ProjectDetailComponent
 *
 * Displays full details for a single project.
 * Route: /projects/:slug
 *
 * Reads slug from ActivatedRoute → loads project from ProjectService.
 * Uses ImageSliderComponent for the gallery.
 */
@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, ImageSliderComponent],
  animations: [fadeSlideIn],
  template: `
    <div *ngIf="project; else notFound">
      <section class="detail" @fadeSlideIn aria-labelledby="project-title">
        <div class="container">

          <!-- Back button -->
          <a
            routerLink="/projects"
            class="back-link"
            aria-label="Back to all projects"
          >
            ← Back to Projects
          </a>

          <!-- Header -->
          <header class="detail__header">
            <h1 id="project-title" class="detail__title">{{ project.title }}</h1>

            <!-- Tech stack -->
            <div class="detail__tags" aria-label="Technology stack">
              <span class="tag" *ngFor="let tech of project.techStack">{{ tech }}</span>
            </div>

            <!-- External links -->
            <div class="detail__links" *ngIf="!project.comingSoon">
              <a
                *ngIf="project.demoUrl"
                [href]="project.demoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="link-btn link-btn--primary"
                [attr.aria-label]="'View live demo of ' + project.title"
              >
                Live Demo ↗
              </a>
              <a
                *ngIf="project.githubUrl"
                [href]="project.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="link-btn link-btn--ghost"
                [attr.aria-label]="'View ' + project.title + ' on GitHub'"
              >
                GitHub ↗
              </a>
            </div>
          </header>

          <!-- Image slider -->
          <app-image-slider
            *ngIf="project.images?.length"
            [images]="project.images"
          ></app-image-slider>

          <!-- Description -->
          <div class="detail__body">
            <p class="detail__description">{{ project.description }}</p>
          </div>

        </div>
      </section>
    </div>

    <ng-template #notFound>
      <div class="not-found">
        <p>Project not found.</p>
        <a routerLink="/projects" class="back-link">← Back to Projects</a>
      </div>
    </ng-template>
  `,
  styles: [`
    .detail {
      min-height: 100vh;
      padding: 7rem 1.5rem 5rem;
    }

    .container {
      max-width: 900px;
      margin: 0 auto;
    }

    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-text-muted);
      text-decoration: none;
      margin-bottom: 2.5rem;
      transition: color 200ms ease;

      &:hover {
        color: var(--color-text);
      }
    }

    .detail__header {
      margin-bottom: 2rem;
    }

    .detail__title {
      font-size: clamp(1.75rem, 4vw, 2.5rem);
      font-weight: 700;
      color: var(--color-text);
      margin: 0 0 1rem;
      letter-spacing: -0.02em;
      line-height: 1.15;
    }

    .detail__tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      margin-bottom: 1.25rem;
    }

    .tag {
      font-size: 0.75rem;
      font-weight: 500;
      padding: 0.25rem 0.65rem;
      border-radius: 4px;
      background: rgba(234, 234, 240, 0.07);
      color: var(--color-text-muted);
      border: 1px solid var(--color-border);
    }

    .detail__links {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .link-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      padding: 0.6rem 1.4rem;
      border-radius: 6px;
      font-size: 0.875rem;
      font-weight: 500;
      text-decoration: none;
      transition: background 200ms ease, border-color 200ms ease;
      letter-spacing: 0.02em;

      &:focus-visible {
        outline: 2px solid var(--color-accent);
        outline-offset: 3px;
      }
    }

    .link-btn--primary {
      background: var(--color-accent);
      color: #fff;
      border: 1px solid var(--color-accent);

      &:hover { background: var(--color-accent-hover); }
    }

    .link-btn--ghost {
      background: transparent;
      color: var(--color-text);
      border: 1px solid var(--color-border);

      &:hover { border-color: rgba(234, 234, 240, 0.3); }
    }

    .detail__body {
      margin-top: 2rem;
    }

    .detail__description {
      font-size: 1rem;
      color: var(--color-text-muted);
      line-height: 1.75;
      margin: 0;
    }

    .not-found {
      min-height: 60vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      color: var(--color-text-muted);
    }
  `],
})
export class ProjectDetailComponent implements OnInit {
  project: Project | undefined;

  private readonly route = inject(ActivatedRoute);
  private readonly projectService = inject(ProjectService);
  private readonly seo = inject(SeoService);
  readonly router = inject(Router);

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          const slug = params.get('slug') ?? '';
          return this.projectService.getBySlug(slug);
        }),
        tap(project => {
          if (project) {
            this.seo.update({
              title: project.title,
              description: project.shortDescription,
              keywords: project.techStack.join(', '),
              ogImage: project.coverImage,
            });
          }
        })
      )
      .subscribe(project => {
        this.project = project;
      });
  }
}
