import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { provideHttpClient, HttpClient } from '@angular/common/http';

import {
  TranslateLoader,
  TranslateModule
} from '@ngx-translate/core';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { routes } from './app.routes';

import { provideNativeDateAdapter } from '@angular/material/core';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    './assets/i18n/',
    '.json'
  );
}


export const appConfig: ApplicationConfig = {
  providers: [

    provideBrowserGlobalErrorListeners(),

    provideRouter(routes),

    provideHttpClient(),
    provideNativeDateAdapter(),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          
          useFactory: createTranslateLoader,
          deps: [HttpClient]
        },
        defaultLanguage: 'en'
      })
    )

  ]
};