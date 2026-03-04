import { Component, OnInit, inject } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { SeoService } from '../../core/seo/seo.service';

/**
 * HomeComponent
 *
 * Root component for the "/" route.
 * Composes the HeroComponent as the single full-viewport section.
 */
@Component({
    selector: 'app-home',
    standalone: true,
    imports: [HeroComponent],
    template: `<app-hero></app-hero>`,
    styles: [`:host { display: block; }`],
})
export class HomeComponent implements OnInit {
    private readonly seo = inject(SeoService);

    ngOnInit(): void {
        this.seo.update({
            title: 'Muhammed Al-Ateeqi | Frontend Angular Developer',
            description:
                'Personal portfolio of Muhammed Al-Ateeqi — a Frontend Angular Developer building high-performance, accessible web applications.',
            keywords: 'Angular, Frontend Developer, Portfolio, Web Development',
        });
    }
}
