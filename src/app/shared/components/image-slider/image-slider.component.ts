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
import { crossfade } from '../../animations/fade.animations';

/**
 * ImageSliderComponent
 *
 * Auto-cycling image carousel with crossfade.
 * Manual navigation via dots. Keyboard accessible.
 * Used on the Project Detail page.
 */
@Component({
    selector: 'app-image-slider',
    standalone: true,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [crossfade],
    template: `
    <div class="slider" role="region" aria-label="Project image gallery">
      <!-- Images -->
      <div class="slider__track">
        <img
          *ngFor="let img of images; let i = index"
          [src]="img"
          [alt]="'Project screenshot ' + (i + 1)"
          class="slider__img"
          [class.slider__img--active]="i === current"
          loading="lazy"
          width="1280"
          height="720"
        />
      </div>

      <!-- Prev / Next arrows -->
      <button
        class="slider__arrow slider__arrow--prev"
        (click)="prev()"
        aria-label="Previous image"
        *ngIf="images.length > 1"
      >
        ‹
      </button>
      <button
        class="slider__arrow slider__arrow--next"
        (click)="next()"
        aria-label="Next image"
        *ngIf="images.length > 1"
      >
        ›
      </button>

      <!-- Dots -->
      <div class="slider__dots" role="tablist" aria-label="Image navigation" *ngIf="images.length > 1">
        <button
          *ngFor="let img of images; let i = index"
          class="slider__dot"
          [class.slider__dot--active]="i === current"
          (click)="goTo(i)"
          [attr.aria-label]="'Go to image ' + (i + 1)"
          [attr.aria-selected]="i === current"
          role="tab"
        ></button>
      </div>
    </div>
  `,
    styles: [`
    .slider {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      background: var(--color-surface);
      border-radius: 10px;
      overflow: hidden;
    }

    .slider__track {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .slider__img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
      transition: opacity 600ms ease;

      &.slider__img--active {
        opacity: 1;
      }
    }

    .slider__arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(24, 27, 52, 0.7);
      border: 1px solid var(--color-border);
      color: var(--color-text);
      font-size: 1.5rem;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 200ms ease;
      z-index: 2;

      &:hover {
        background: rgba(24, 27, 52, 0.92);
      }

      &:focus-visible {
        outline: 2px solid var(--color-accent);
        outline-offset: 2px;
      }
    }

    .slider__arrow--prev { left: 0.75rem; }
    .slider__arrow--next { right: 0.75rem; }

    .slider__dots {
      position: absolute;
      bottom: 0.875rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 0.4rem;
      z-index: 2;
    }

    .slider__dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: rgba(234, 234, 240, 0.3);
      border: none;
      cursor: pointer;
      padding: 0;
      transition: background 250ms ease, transform 250ms ease;

      &.slider__dot--active {
        background: var(--color-text);
        transform: scale(1.4);
      }

      &:focus-visible {
        outline: 2px solid var(--color-accent);
        outline-offset: 2px;
      }
    }
  `],
})
export class ImageSliderComponent implements OnInit, OnDestroy {
    @Input({ required: true }) images: string[] = [];
    @Input() autoPlayInterval = 4000;

    current = 0;
    private timer: ReturnType<typeof setInterval> | null = null;
    private readonly cdr = inject(ChangeDetectorRef);

    ngOnInit(): void {
        if (this.images.length > 1) {
            this.startAutoPlay();
        }
    }

    ngOnDestroy(): void {
        this.stopAutoPlay();
    }

    goTo(index: number): void {
        this.current = index;
        this.resetAutoPlay();
        this.cdr.markForCheck();
    }

    next(): void {
        this.current = (this.current + 1) % this.images.length;
        this.resetAutoPlay();
        this.cdr.markForCheck();
    }

    prev(): void {
        this.current = (this.current - 1 + this.images.length) % this.images.length;
        this.resetAutoPlay();
        this.cdr.markForCheck();
    }

    private startAutoPlay(): void {
        this.timer = setInterval(() => {
            this.current = (this.current + 1) % this.images.length;
            this.cdr.markForCheck();
        }, this.autoPlayInterval);
    }

    private stopAutoPlay(): void {
        if (this.timer !== null) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    private resetAutoPlay(): void {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
}
