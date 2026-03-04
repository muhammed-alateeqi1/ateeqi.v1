import {
    Component,
    ElementRef,
    OnInit,
    OnDestroy,
    ViewChild,
    AfterViewInit,
    inject,
    PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { FloatingPreviewComponent } from '../../../shared/components/floating-preview/floating-preview.component';
import { ProjectService } from '../../../core/services/project.service';
import { Project } from '../../../core/models/project.model';
import { fadeSlideIn } from '../../../shared/animations/fade.animations';
import { SeoService } from '../../../core/seo/seo.service';

/**
 * HeroComponent
 *
 * Full-viewport hero section for the home page.
 * - Background: profile photo + dark overlay
 * - Three.js subtle floating geometry (canvas layer, very lightweight)
 * - Content: name, title, bio, two CTA buttons
 * - Projects button shows FloatingPreviewComponent on hover (desktop)
 *   or click (mobile)
 *
 * Three.js is dynamically imported to avoid SSR issues and keep bundle size minimal.
 * The animation loop is cleaned up on component destroy to prevent memory leaks.
 */
@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [CommonModule, RouterModule, ButtonComponent, FloatingPreviewComponent],
    animations: [fadeSlideIn],
    templateUrl: './hero.component.html',
    styleUrl: 'hero.component.css',
})
export class HeroComponent implements AfterViewInit, OnDestroy {
    @ViewChild('threeCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

    allProjects: Project[] = [];
    showPreview = false;
    private isMobile = false;

    private animationFrameId: number | null = null;
    private renderer: { dispose: () => void; domElement: HTMLCanvasElement } | null = null;

    private readonly platformId = inject(PLATFORM_ID);
    readonly router = inject(Router);
    private readonly projectService = inject(ProjectService);
    private readonly seo = inject(SeoService);

    constructor() {
        this.projectService.getAll().subscribe(projects => {
            this.allProjects = projects;
        });
    }

    ngAfterViewInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.isMobile = window.matchMedia('(hover: none)').matches;
            this.initThreeJs();
        }
    }

    ngOnDestroy(): void {
        this.destroyThreeJs();
    }

    // ─── Three.js ─────────────────────────────────────────────────────────────

    /**
     * Lazily imports Three.js and initialises a very lightweight icosahedron
     * wireframe that slowly rotates. Keeps bundle size small and avoids
     * blocking the main thread.
     */
    private async initThreeJs(): Promise<void> {
        try {
            const THREE = await import('three');
            const canvas = this.canvasRef.nativeElement;
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;

            // Scene
            const scene = new THREE.Scene();

            // Camera
            const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
            camera.position.z = 3.5;

            // Renderer — alpha so canvas is transparent over the photo
            const renderer = new THREE.WebGLRenderer({
                canvas,
                alpha: true,
                antialias: false,
                powerPreference: 'low-power',
            });
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
            renderer.setSize(width, height, false);
            this.renderer = renderer;

            // Geometry — icosahedron wireframe
            const geo = new THREE.IcosahedronGeometry(1.4, 1);
            const mat = new THREE.MeshBasicMaterial({
                color: 0x3d4470,
                wireframe: true,
                transparent: true,
                opacity: 0.28,
            });
            const mesh = new THREE.Mesh(geo, mat);
            scene.add(mesh);

            // Second smaller sphere for depth
            const geo2 = new THREE.IcosahedronGeometry(0.75, 1);
            const mat2 = new THREE.MeshBasicMaterial({
                color: 0x4a5280,
                wireframe: true,
                transparent: true,
                opacity: 0.18,
            });
            const mesh2 = new THREE.Mesh(geo2, mat2);
            mesh2.position.set(1.8, -0.8, -0.5);
            scene.add(mesh2);

            // Handle resize
            const onResize = () => {
                const w = canvas.clientWidth;
                const h = canvas.clientHeight;
                camera.aspect = w / h;
                camera.updateProjectionMatrix();
                renderer.setSize(w, h, false);
            };
            window.addEventListener('resize', onResize);

            // Animation loop
            const animate = () => {
                this.animationFrameId = requestAnimationFrame(animate);
                // Very slow rotation — calm, executive
                mesh.rotation.x += 0.0008;
                mesh.rotation.y += 0.0012;
                mesh2.rotation.x -= 0.0006;
                mesh2.rotation.y += 0.0009;
                renderer.render(scene, camera);
            };

            animate();

            // Cleanup resize listener on destroy (stored for reference)
            (this as unknown as { _onResize: () => void })['_onResize'] = onResize;
        } catch {
            // If Three.js fails for any reason (e.g. SSR), silently skip
        }
    }

    private destroyThreeJs(): void {
        if (this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
        if (this.renderer) {
            this.renderer.dispose();
            this.renderer = null;
        }
        const onResize = (this as unknown as { _onResize?: () => void })['_onResize'];
        if (onResize) {
            window.removeEventListener('resize', onResize);
        }
    }

    // ─── Projects button interactions ─────────────────────────────────────────

    onProjectsHover(entering: boolean): void {
        if (!this.isMobile) {
            this.showPreview = entering;
        }
    }

    onProjectsClick(): void {
        if (this.isMobile) {
            // Toggle bottom-sheet preview on mobile; navigate on second tap
            if (this.showPreview) {
                this.router.navigate(['/projects']);
            } else {
                this.showPreview = true;
                // Auto-dismiss preview after 4s on mobile
                setTimeout(() => { this.showPreview = false; }, 4000);
            }
        } else {
            this.router.navigate(['/projects']);
        }
    }
}
