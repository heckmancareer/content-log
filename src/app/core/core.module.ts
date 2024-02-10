import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';

import { CoreRoutingModule } from './core-routing.module';

// NG Prime Imports
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { CoreComponent } from './core-component/core.component';

// AoT requires an exported function for factories
const httpLoaderFactory = (http: HttpClient): TranslateHttpLoader =>  new TranslateHttpLoader(http, './assets/i18n/', '.json');

@NgModule({
  declarations: [CoreComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    CoreRoutingModule,
    DividerModule,
    RippleModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [CoreComponent]
})
export class CoreModule {}
