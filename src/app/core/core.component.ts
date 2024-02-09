import { Component } from '@angular/core';
import { ElectronService } from './services';
import { TranslateService } from '@ngx-translate/core';
import { APP_CONFIG } from '../../environments/environment';
import { CATEGORIES } from '../shared/constants/content-log-categories';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent {
  contentCategories = CATEGORIES

  constructor(
    private electronService: ElectronService,
    private translate: TranslateService,
    private primengConfig: PrimeNGConfig
  ) {
    this.translate.setDefaultLang('en');
    console.log('APP_CONFIG', APP_CONFIG);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);
    } else {
      console.log('Run in browser');
    }
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
}
