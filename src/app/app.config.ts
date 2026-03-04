import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';

/**
 * Root application configuration.
 *
 * - provideHttpClient(withFetch): uses the Fetch API which is compatible with SSG/prerendering
 * - provideClientHydration: enables DOM hydration after SSG prerender
 * - withInMemoryScrolling: restores scroll position on back navigation
 * - provideAnimations: enables Angular animations globally
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top' })
    ),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimations(),
  ],
};
