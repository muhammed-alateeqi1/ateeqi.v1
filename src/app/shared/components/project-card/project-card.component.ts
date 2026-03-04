import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Project } from '../../../core/models/project.model';

/**
 * ProjectCardComponent
 *
 * Displays a single project in a grid/list context.
 * Navigates to /projects/:slug on click.
 */
@Component({
    selector: 'app-project-card',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
    <article
      class="card"
      [routerLink]="project.comingSoon ? null : ['/projects', project.slug]"
      [class.card--coming-soon]="project.comingSoon"
      [attr.aria-label]="project.title"
      tabindex="0"
      (keydown.enter)="navigate()"
    >
      <!-- Cover image -->
      <div class="card__image-wrapper">
        <img
          [src]="project.coverImage"
          [alt]="project.title + ' cover image'"
          class="card__image"
          loading="lazy"
          width="640"
          height="360"
        />
        <div class="card__overlay" *ngIf="project.comingSoon">
          <span class="coming-soon-badge">Coming Soon</span>
        </div>
      </div>

      <!-- Content -->
      <div class="card__content">
        <h3 class="card__title">{{ project.title }}</h3>
        <p class="card__desc">{{ project.shortDescription }}</p>

        <!-- Tech stack tags -->
        <div class="card__tags" *ngIf="project.techStack.length > 0" aria-label="Tech stack">
          <span
            class="tag"
            *ngFor="let tech of project.techStack"
          >{{ tech }}</span>
        </div>

        <span class="card__cta" *ngIf="!project.comingSoon" aria-hidden="true">
          View Project →
        </span>
      </div>
    </article>
  `,
    styles: [`
    .card {
      background: var(--color-card);
      border: 1px solid var(--color-border);
      border-radius: 10px;
      overflow: hidden;
      cursor: pointer;
      transition: transform 280ms ease, border-color 280ms ease;
      display: flex;
      flex-direction: column;
      text-decoration: none;

      &:hover:not(.card--coming-soon) {
        transform: translateY(-4px);
        border-color: rgba(234, 234, 240, 0.18);
      }

      &:focus-visible {
        outline: 2px solid var(--color-accent);
        outline-offset: 3px;
      }
    }

    .card--coming-soon {
      cursor: default;
      opacity: 0.6;
    }

    .card__image-wrapper {
      position: relative;
      aspect-ratio: 16 / 9;
      background: var(--color-surface);
      overflow: hidden;
    }

    .card__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 600ms ease;

      .card:hover & {
        transform: scale(1.03);
      }
    }

    .card__overlay {
      position: absolute;
      inset: 0;
      background: rgba(24, 27, 52, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .coming-soon-badge {
      font-size: 0.8125rem;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--color-text-muted);
      border: 1px solid var(--color-border);
      padding: 0.35rem 0.9rem;
      border-radius: 4px;
    }

    .card__content {
      padding: 1.25rem 1.5rem 1.5rem;
      display: flex;
      flex-direction: column;
      flex: 1;
      gap: 0.5rem;
    }

    .card__title {
      font-size: 1.0625rem;
      font-weight: 600;
      color: var(--color-text);
      margin: 0;
    }

    .card__desc {
      font-size: 0.875rem;
      color: var(--color-text-muted);
      line-height: 1.55;
      margin: 0;
      flex: 1;
    }

    .card__tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.375rem;
      margin-top: 0.25rem;
    }

    .tag {
      font-size: 0.75rem;
      font-weight: 500;
      padding: 0.2rem 0.6rem;
      border-radius: 4px;
      background: rgba(234, 234, 240, 0.07);
      color: var(--color-text-muted);
      border: 1px solid var(--color-border);
    }

    .card__cta {
      font-size: 0.8125rem;
      font-weight: 500;
      color: var(--color-accent);
      margin-top: 0.5rem;
      transition: letter-spacing 200ms ease;

      .card:hover & {
        letter-spacing: 0.03em;
      }
    }
  `],
})
export class ProjectCardComponent {
    @Input({ required: true }) project!: Project;

    navigate(): void {
        // keyboard enter navigation handled by routerLink
    }
}
