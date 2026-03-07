import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProjectService } from '../../../core/services/project.service';
import { Project } from '../../../core/models/project.model';
import { ImageSliderComponent } from '../../../shared/components/image-slider/image-slider.component';
import { SeoService } from '../../../core/seo/seo.service';
import { fadeSlideIn } from '../../../shared/animations/fade.animations';
import { switchMap, tap } from 'rxjs';

/**
 * ProjectDetailComponent
 *
 * Displays full details for a single project.
 * Route: /projects/:slug
 *
 * Reads slug from ActivatedRoute → loads project from ProjectService.
 * Uses ImageSliderComponent for the gallery.
 */
@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, ImageSliderComponent],
  animations: [fadeSlideIn],
  templateUrl: "./project-detail.component.html",
  styleUrl:"./project-detail.component.css",
})
export class ProjectDetailComponent implements OnInit {
  project: Project | undefined;

  private readonly route = inject(ActivatedRoute);
  private readonly projectService = inject(ProjectService);
  private readonly seo = inject(SeoService);
  readonly router = inject(Router);

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          const slug = params.get('slug') ?? '';
          return this.projectService.getBySlug(slug);
        }),
        tap(project => {
          if (project) {
            this.seo.update({
              title: project.title,
              description: project.shortDescription,
              keywords: project.techStack.join(', '),
              ogImage: project.coverImage,
            });
          }
        })
      )
      .subscribe(project => {
        this.project = project;
      });
  }
}
