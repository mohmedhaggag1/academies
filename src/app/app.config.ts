import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners
} from '@angular/core';

import {
  provideHttpClient,
  withInterceptors,
  HttpClient
} from '@angular/common/http';

import { provideRouter } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';

import {
  TranslateLoader,
  TranslateModule
} from '@ngx-translate/core';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { routes } from './app.routes';
import { globalInterceptor } from './core/interceptors/global-interceptor';

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

    provideHttpClient(
      withInterceptors([
        globalInterceptor
      ])
    ),

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
