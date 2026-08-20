import { Component } from '@angular/core';

@Component({
    selector: 'logo',
    imports: [],
    template: `
    <img src="/icons/logo1.png" alt="logo icon" width="50px" />
  `,
    styles: ``
})
export class LogoComponent {
  language = localStorage.getItem('language') || 'en';
  icon = this.language === 'en' ? 'logo' : 'logo';
}
