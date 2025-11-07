import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config'; // <-- Aici e cheia!
import { App } from './app/app'; // <-- Probabil componenta ta rădăcină (root component)

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));