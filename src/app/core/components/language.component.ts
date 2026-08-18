import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'language',
    imports: [CommonModule],
    template: `
    <div class="flags pointer">
      <div (click)="switchLanguage('en')" *ngIf="language == 'ar'">
        <!-- <img ngSrc="assets/images/flags/en.png" alt="" width="40" height="25"> -->
        English
      </div>
      <div (click)="switchLanguage('ar')" *ngIf="language == 'en'">
        <!-- <img ngSrc="assets/images/flags/ar.png" alt="" width="30" height="30"> -->
        العربية
      </div>
    </div>
  `
})
export class LanguageComponent {
  language = localStorage.getItem('language') || 'en';

  constructor() {
  }

  switchLanguage(lang: string) {
    localStorage.setItem('language', lang);
    window.location.reload();
  }

}
