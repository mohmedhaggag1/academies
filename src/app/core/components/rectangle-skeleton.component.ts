import { Component, Input } from '@angular/core';

@Component({
    selector: 'rectangle-skeleton',
    imports: [],
    template: `
    <div class="skeleton-loader"></div>
  `,
    styles: `
    .skeleton-loader {
      width:100%;
      height: 100%;
      background: linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%);
      background-size: 200% 100%;
      animation: skeleton-loading 1.5s infinite linear;
      border-radius: 0.5rem;
    }

    @keyframes skeleton-loading {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }
  `
})
export class RectangleSkeletonComponent {}
