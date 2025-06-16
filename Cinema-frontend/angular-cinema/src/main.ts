import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/routes/app.routes'; 
import { register } from 'swiper/element/bundle';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


register();
registerLocaleData(localePl);

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideAnimationsAsync(),
    { provide: 'LOCALE_ID', useValue: 'pl' }
  ]
}).catch(err => console.error(err));