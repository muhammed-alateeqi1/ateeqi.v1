import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../core/seo/seo.service';
import { fadeSlideIn } from '../../shared/animations/fade.animations';

/**
 * AboutComponent
 *
 * Route: /about
 * Presents a professional bio, skills, and a brief timeline.
 * Replace placeholder text with real content when ready.
 */
@Component({
    selector: 'app-about',
    standalone: true,
    imports: [CommonModule],
    animations: [fadeSlideIn],
    template: `
    <section class="about" @fadeSlideIn aria-labelledby="about-heading">
      <div class="container">

        <header class="section-header">
          <p class="section-eyebrow">Who I Am</p>
          <h1 id="about-heading" class="section-title">About Me</h1>
        </header>

        <div class="about__grid">
          <!-- Photo -->
          <div class="about__photo-wrap">
            <img
              src="/assets/images/profile.jpg"
              alt="Muhammed Al-Ateeqi"
              class="about__photo"
              width="400"
              height="480"
              loading="lazy"
            />
          </div>

          <!-- Bio -->
          <div class="about__bio">
            <p>
              I'm <strong>Muhammed Al-Ateeqi</strong>, a Frontend Angular Developer
              with a passion for building clean, performant, and accessible web applications.
              I specialise in Angular architecture, reactive programming with RxJS,
              and delivering polished user interfaces.
            </p>
            <p>
              I believe great software emerges from the intersection of sharp
              engineering and thoughtful design. I take pride in code that is
              modular, readable, and built to last.
            </p>

            <!-- Skills -->
            <div class="about__skills">
              <h2 class="skills__heading">Core Skills</h2>
              <div class="skills__grid">
                <span class="skill-tag" *ngFor="let skill of skills">{{ skill }}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  `,
    styles: [`
    .about {
      min-height: 100vh;
      padding: 7rem 1.5rem 5rem;
    }

    .container {
      max-width: 1100px;
      margin: 0 auto;
    }

    .section-header {
      margin-bottom: 3rem;
    }

    .section-eyebrow {
      font-size: 0.8125rem;
      font-weight: 500;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--color-text-muted);
      margin: 0 0 0.6rem;
    }

    .section-title {
      font-size: clamp(1.875rem, 4vw, 2.75rem);
      font-weight: 700;
      color: var(--color-text);
      margin: 0;
      letter-spacing: -0.02em;
    }

    .about__grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 3rem;
      align-items: start;

      @media (min-width: 768px) {
        grid-template-columns: 280px 1fr;
      }
    }

    .about__photo-wrap {
      position: relative;
    }

    .about__photo {
      width: 100%;
      max-width: 280px;
      aspect-ratio: 5 / 6;
      object-fit: cover;
      border-radius: 10px;
      border: 1px solid var(--color-border);
      display: block;
    }

    .about__bio {
      display: flex;
      flex-direction: column;
      gap: 1.1rem;

      p {
        font-size: 1rem;
        color: var(--color-text-muted);
        line-height: 1.75;
        margin: 0;

        strong {
          color: var(--color-text);
          font-weight: 600;
        }
      }
    }

    .about__skills {
      margin-top: 1rem;
    }

    .skills__heading {
      font-size: 0.875rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--color-text-muted);
      margin: 0 0 0.875rem;
    }

    .skills__grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .skill-tag {
      font-size: 0.8125rem;
      font-weight: 500;
      padding: 0.3rem 0.8rem;
      border-radius: 5px;
      background: rgba(234, 234, 240, 0.06);
      color: var(--color-text-muted);
      border: 1px solid var(--color-border);
    }
  `],
})
export class AboutComponent implements OnInit {
    readonly skills = [
        'Angular 17+', 'TypeScript', 'RxJS', 'Angular Universal', 'HTML5', 'CSS3',
        'REST APIs', 'JWT Auth', 'D3.js', 'TailwindCSS', 'Git', 'Figma',
    ];

    private readonly seo = inject(SeoService);

    ngOnInit(): void {
        this.seo.update({
            title: 'About',
            description:
                'Learn more about Muhammed Al-Ateeqi — Frontend Angular Developer, his skills, and engineering philosophy.',
            keywords: 'About, Angular Developer, Muhammed Al-Ateeqi',
        });
    }
}
