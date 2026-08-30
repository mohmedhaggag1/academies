import { Component, Input } from '@angular/core';

@Component({
    selector: 'logo',
    imports: [],
    template: `
    <img src="/icons/logo1.png" alt="logo icon"  [width]="width" />
  `,
    styles: ``
})
export class LogoComponent {
  language = localStorage.getItem('language') || 'en';
  icon = this.language === 'en' ? 'logo' : 'logo';
@Input() width = 50;

}
