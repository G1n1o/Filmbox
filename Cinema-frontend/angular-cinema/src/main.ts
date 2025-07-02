import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Router } from '@angular/router';
import { routes } from './app/routes/app.routes';
import { register } from 'swiper/element/bundle';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {OKTA_AUTH, OKTA_CONFIG, OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import myAppConfig from './app/config/my-app-config';

const oktaConfig = myAppConfig.oidc;
const oktaAuth = new OktaAuth(oktaConfig);

register();
registerLocaleData(localePl);

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideAnimationsAsync(),
    { provide: 'LOCALE_ID', useValue: 'pl' },
    { provide: OKTA_AUTH, useValue: oktaAuth },
    { provide: OKTA_CONFIG, useValue: { oktaAuth } },
    OktaAuthStateService,
  ],
}).catch((err) => console.error(err));
