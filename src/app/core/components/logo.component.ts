import { Component } from '@angular/core';

@Component({
    selector: 'logo',
    imports: [],
    template: `
    <img src="assets/images/logo/{{ icon }}.svg" alt="logo icon" width="100%" />
  `,
    styles: ``
})
export class LogoComponent {
  language = localStorage.getItem('language') || 'en';
  icon = this.language === 'en' ? 'logo' : 'logo';
}
