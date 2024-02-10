import { Component } from '@angular/core';
import { ElectronService } from '../services';
import { TranslateService } from '@ngx-translate/core';
import { APP_CONFIG } from '../../../environments/environment';
import { CATEGORIES } from '../../shared/constants/content-log-categories';
import { PrimeNGConfig } from 'primeng/api';
import { ActivatedRoute, NavigationEnd, Router, Event } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgClass } from '@angular/common';
@Component({
  selector: 'core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
})
export class CoreComponent {
  private routeSub!: Subscription;
  contentCategories = CATEGORIES
  sidebarActiveRoute: boolean[] = Object.keys(CATEGORIES).map(() => false);
  highlightColor: string = ''

  constructor(
    private electronService: ElectronService,
    private translate: TranslateService,
    private primengConfig: PrimeNGConfig,
    private activatedRoute: ActivatedRoute,
    private router: Router
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
    // After navigation event ends, look at the current url. If the
    // leading segment matches one of the content categories,
    // then activate the corresponding sidebar item.
    this.routeSub = this.router.events.subscribe((event: Event) => {
      if(event instanceof NavigationEnd) {
        this.sidebarActiveRoute = this.sidebarActiveRoute.map(() => false);
        let urlSegments = event.url.split('/');
        for(let i = 0; i < this.contentCategories.length; i++) {
          if(urlSegments[1] === this.contentCategories[i].route) {
            this.sidebarActiveRoute[i] = true;
            this.highlightColor = this.contentCategories[i].color;
            break;
          }
        }
      }
    })
  }

  ngOnDestroy(): void {
    if(this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  getSidebarNavItemBackgroundColorClass(index: number, hoverElevationValue: number, activeElevationValue: number) {
    if(this.sidebarActiveRoute[index]) {
      return `bg-${this.highlightColor}-${activeElevationValue}
        hover:bg-${this.highlightColor}-${activeElevationValue + hoverElevationValue}
        text-white`
    } else {
      return `hover:bg-${this.contentCategories[index].color}-${hoverElevationValue}`
    }

  }
}
