import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export type ButtonVariant = 'primary' | 'ghost';

/**
 * Reusable button component.
 * Supports primary (filled) and ghost (outlined) variants.
 * Can be used as a regular button or with [routerLink].
 */
@Component({
    selector: 'app-button',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
        <button [class]="'btn btn--' + variant" [attr.aria-label]="ariaLabel || null" [disabled]="disabled" (click)="clicked.emit($event)">
            <ng-content></ng-content>
        </button>
    `,
    styles: [
        `
            .btn {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.75rem 1.75rem;
                border-radius: 6px;
                font-family: inherit;
                font-size: 0.9375rem;
                font-weight: 500;
                letter-spacing: 0.02em;
                cursor: pointer;
                border: 1px solid transparent;
                transition:
                    background 200ms ease,
                    border-color 200ms ease,
                    opacity 200ms ease;

                &:disabled {
                    opacity: 0.45;
                    cursor: not-allowed;
                }

                &:focus-visible {
                    outline: 2px solid var(--color-accent);
                    outline-offset: 3px;
                }
            }

            .btn--primary {
                background: var(--color-accent);
                color: #fff;
                border-color: var(--color-accent);

                &:hover:not(:disabled) {
                    background: var(--color-accent-hover);
                    border-color: var(--color-accent-hover);
                }
            }

            .btn--ghost {
                background: transparent;
                color: var(--color-text);
                border-color: rgba(234, 234, 240, 0.25);

                &:hover:not(:disabled) {
                    border-color: rgba(234, 234, 240, 0.55);
                    background: rgba(234, 234, 240, 0.05);
                }
            }
        `,
    ],
})
export class ButtonComponent {
    @Input() variant: ButtonVariant = 'primary';
    @Input() ariaLabel = '';
    @Input() disabled = false;
    @Output() clicked = new EventEmitter<MouseEvent>();
}
