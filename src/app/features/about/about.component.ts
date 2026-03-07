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
    templateUrl: './about.component.html',
    styleUrl: 'about.component.css',
})
export class AboutComponent implements OnInit {
    readonly skills = ['Angular 17+', 'TypeScript', 'RxJS', 'Angular Universal', 'HTML5', 'CSS3', 'REST APIs', 'JWT Auth', 'D3.js', 'TailwindCSS', 'Git', 'Figma'];

    private readonly seo = inject(SeoService);

    ngOnInit(): void {
        this.seo.update({
            title: 'About',
            description: 'Learn more about Muhammed Al-Ateeqi — Frontend Angular Developer, his skills, and engineering philosophy.',
            keywords: 'About, Angular Developer, Muhammed Al-Ateeqi',
        });
    }
}
