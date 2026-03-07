import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../core/seo/seo.service';
import { fadeSlideIn } from '../../shared/animations/fade.animations';

/**
 * ContactComponent
 *
 * Route: /contact
 * A minimal contact section with a direct email link and social links.
 * No backend required — clicking the email link opens the user's mail client.
 */
@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [CommonModule],
    animations: [fadeSlideIn],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.css',
})
export class ContactComponent implements OnInit {
    private readonly seo = inject(SeoService);

    ngOnInit(): void {
        this.seo.update({
            title: 'Contact',
            description: 'Get in touch with Muhammed Al-Ateeqi for freelance projects, collaborations, or opportunities.',
            keywords: 'Contact, Hire Angular Developer, Muhammed Al-Ateeqi',
        });
    }
}
