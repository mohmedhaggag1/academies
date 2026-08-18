import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
 language = localStorage.getItem('language') || 'en';

  constructor(private translate: TranslateService) {
    // this.setLanguage();
  }

  ngOnInit(): void {
  }

  // setLanguage() {
  //   // this language will be used as a fallback when a translation isn't found in the current language
  //   this.translate.setDefaultLang('en');

  //   // the lang to use, if the lang isn't available, it will use the current loader to get them
  //   this.translate.use(this.language);

  //   document.dir = this.language === 'ar' ? 'rtl' : 'ltr';
  // }
}