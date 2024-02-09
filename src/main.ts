import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { CoreModule } from './app/core/core.module';
import { APP_CONFIG } from './environments/environment';

if (APP_CONFIG.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(CoreModule, {
    preserveWhitespaces: false
  })
  .catch(err => console.error(err));
