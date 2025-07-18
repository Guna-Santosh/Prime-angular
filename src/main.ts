import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent,  } from './app/app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

  export const appConfig: ApplicationConfig = {
      providers: [
      provideHttpClient(withFetch()),
      provideAnimationsAsync(),
      providePrimeNG({
          theme: { preset: Aura, options: { darkModeSelector: '.p-dark' } },
      }),
       provideRouter(appRoutes), // 🔥 This is the missing piece
    ],
  };

    bootstrapApplication(AppComponent, appConfig).catch((err) =>
    console.error(err)
);