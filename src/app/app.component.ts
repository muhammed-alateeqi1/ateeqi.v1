import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

/**
 * AppComponent
 *
 * Application shell: navigation bar, router outlet, footer.
 * Minimal, sticky navbar with logo and nav links.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  readonly year = new Date().getFullYear();
}
