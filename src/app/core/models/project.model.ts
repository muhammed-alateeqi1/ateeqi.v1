/**
 * Core data model for a portfolio project.
 * All project data is sourced from /assets/data/projects.json.
 */
export interface Project {
  /** URL-friendly identifier used in routing (e.g. "cyber50-dashboard") */
  slug: string;

  /** Display title of the project */
  title: string;

  /** One-line summary shown on project cards */
  shortDescription: string;

  /** Full markdown-ready description shown on detail page */
  description: string;

  /** Path to cover image used on the project card */
  coverImage: string;

  /** Array of image paths used in the detail page image slider */
  images: string[];

  /** Technologies used in the project */
  techStack: string[];

  /** Live demo URL (empty string if none) */
  demoUrl: string;

  /** GitHub repository URL (empty string if none) */
  githubUrl: string;

  /** When true, the project is shown as a placeholder "Coming Soon" card */
  comingSoon: boolean;
}
