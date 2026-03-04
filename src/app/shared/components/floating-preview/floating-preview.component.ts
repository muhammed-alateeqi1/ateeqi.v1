import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../../core/models/project.model';
import { floatIn } from '../../animations/fade.animations';

/**
 * FloatingPreviewComponent
 *
 * Shows a floating card preview of projects on hover over the "Projects" button.
 * Desktop: positioned to the right of the trigger element.
 * Mobile (@media hover:none): rendered as a bottom sheet via CSS.
 *
 * Auto-rotates project images every 3 seconds with a slow zoom + crossfade.
 */
@Component({
  selector: 'app-floating-preview',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [floatIn],
  template: `
    <div class="preview" @floatIn role="dialog" aria-label="Project preview">
      <!-- Image area -->
      <div class="preview__image-wrap">
        <img
          *ngFor="let project of visibleProjects; let i = index"
          [src]="project.coverImage"
          [alt]="project.title + ' preview'"
          class="preview__img"
          [class.preview__img--active]="i === currentIndex"
          loading="lazy"
          width="360"
          height="200"
        />
        <!-- Slow zoom overlay handled by CSS animation on active image -->
      </div>

      <!-- Project title -->
      <div class="preview__footer">
        <span class="preview__label" *ngIf="visibleProjects.length">
          {{ visibleProjects[currentIndex].title }}
        </span>
        <!-- Dots -->
        <div class="preview__dots" aria-hidden="true">
          <span
            *ngFor="let p of visibleProjects; let i = index"
            class="preview__dot"
            [class.preview__dot--active]="i === currentIndex"
          ></span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .preview {
      position: absolute;
      top: 50%;
      left: calc(100% + 1.5rem);
      transform: translateY(-50%);
      width: 300px;
      background: rgba(41, 47, 76, 0.9);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(234, 234, 240, 0.08);
      border-radius: 10px;
      overflow: hidden;
      z-index: 100;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);

      /* Mobile: bottom sheet */
      @media (hover: none) {
        position: fixed;
        top: auto;
        left: 1rem;
        right: 1rem;
        bottom: 1.5rem;
        width: auto;
        transform: none;
        border-radius: 12px;
      }
    }

    .preview__image-wrap {
      position: relative;
      aspect-ratio: 16 / 9;
      background: var(--color-surface);
      overflow: hidden;
    }

    .preview__img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
      transform: scale(1);
      transition: opacity 700ms ease, transform 6000ms ease;

      &.preview__img--active {
        opacity: 1;
        transform: scale(1.06); /* subtle slow zoom */
      }
    }

    .preview__footer {
      padding: 0.75rem 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
    }

    .preview__label {
      font-size: 0.8125rem;
      font-weight: 500;
      color: var(--color-text-muted);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .preview__dots {
      display: flex;
      gap: 0.35rem;
      flex-shrink: 0;
    }

    .preview__dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: rgba(234, 234, 240, 0.25);
      transition: background 250ms ease;

      &.preview__dot--active {
        background: var(--color-text-muted);
      }
    }
  `],
})
export class FloatingPreviewComponent implements OnInit, OnDestroy {
  /** All projects to cycle through (filtered to non-coming-soon) */
  @Input() projects: Project[] = [];

  currentIndex = 0;
  private timer: ReturnType<typeof setInterval> | null = null;
  private readonly cdr = inject(ChangeDetectorRef);

  get visibleProjects(): Project[] {
    return this.projects.filter(p => !p.comingSoon);
  }

  ngOnInit(): void {
    if (this.visibleProjects.length > 1) {
      this.timer = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.visibleProjects.length;
        this.cdr.markForCheck();
      }, 3000);
    }
  }

  ngOnDestroy(): void {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}
