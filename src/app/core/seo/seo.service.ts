import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

/** Route-level SEO metadata */
export interface SeoData {
    title: string;
    description: string;
    keywords?: string;
    ogImage?: string;
}

/**
 * SeoService
 *
 * Updates the page title and meta tags on each route.
 * Call `update()` inside each feature component's ngOnInit.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
    private readonly meta = inject(Meta);
    private readonly title = inject(Title);

    private readonly siteName = 'Muhammed Al-Ateeqi | Frontend Angular Developer';

    update(data: SeoData): void {
        // Title
        const fullTitle = data.title ? `${data.title} | Muhammed Al-Ateeqi` : this.siteName;
        this.title.setTitle(fullTitle);

        // Standard meta
        this.meta.updateTag({ name: 'description', content: data.description });
        if (data.keywords) {
            this.meta.updateTag({ name: 'keywords', content: data.keywords });
        }

        // Open Graph
        this.meta.updateTag({ property: 'og:title', content: fullTitle });
        this.meta.updateTag({ property: 'og:description', content: data.description });
        this.meta.updateTag({ property: 'og:type', content: 'website' });
        if (data.ogImage) {
            this.meta.updateTag({ property: 'og:image', content: data.ogImage });
        }

        // Twitter / X
        this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
        this.meta.updateTag({ name: 'twitter:description', content: data.description });
    }
}
