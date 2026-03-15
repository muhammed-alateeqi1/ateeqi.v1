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
    readonly skills = [
        // Frontend Core
        'HTML5',
        'CSS3',
        'JavaScript (ES6+)',
        'TypeScript',

        // Frameworks & Libraries
        'Angular (v17+)',
        'RxJS',
        'Tailwind CSS',
        'Bootstrap 5',
        'jQuery',
        'D3.js',

        // Design & Responsive
        'Responsive Design',
        'Mobile-First Design',
        'Figma',

        // Integration & APIs
        'REST APIs',
        'JWT Auth',
        'AJAX',
        'Fetch API',

        // Dev Tools
        'Git',
        'GitHub',
        'Postman',

        // Optimization
        'SEO Optimization',
        'Performance Tuning',

        // Currently Learning
        'C#',
        'Database Schema Design',
    ];
    private readonly seo = inject(SeoService);

    ngOnInit(): void {
        this.seo.update({
            title: 'About',
            description: 'Learn more about Muhammed Al-Ateeqi — Frontend Angular Developer, his skills, and engineering philosophy.',
            keywords: 'About, Angular Developer, Muhammed Al-Ateeqi',
        });
    }
}
