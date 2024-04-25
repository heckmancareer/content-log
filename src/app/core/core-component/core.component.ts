import { Component, OnDestroy, OnInit } from '@angular/core';
import { ElectronService } from '../services';
import { TranslateService } from '@ngx-translate/core';
import { APP_CONFIG } from '../../../environments/environment';
import { CATEGORIES } from '../../shared/constants/content-log-categories';
import { MENU_BAR } from '../../shared/constants/menu-bar-options';
import { PrimeNGConfig } from 'primeng/api';
import { ActivatedRoute, NavigationEnd, Router, Event } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { MasterDataManagementService } from '../../shared/services/master-data-management.service';
import { EntityType } from '../../shared/models/entity-type';
@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
})
export class CoreComponent implements OnInit, OnDestroy {
  private routeSub!: Subscription;
  contentCategories = CATEGORIES
  menuBarConfig = MENU_BAR
  sidebarActiveRoute: boolean[] = Object.keys(CATEGORIES).map(() => false);
  highlightColor: string = ''
  breadcrumbMenuItems: MenuItem[] | undefined
  breadcrumbHomeMenuItem: MenuItem | undefined = {icon: 'pi pi-home'}
  menuBarConfigIndex: number = 0

  constructor(
    private electronService: ElectronService,
    private translate: TranslateService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private masterDataManagementService: MasterDataManagementService
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
        const urlSegments = event.url.split('/');
        this.breadcrumbMenuItems = this.constructBreadcrumbMenuItems(urlSegments.slice(1));
        for(let i = 0; i < this.contentCategories.length; i++) {
          if(urlSegments[1] === this.contentCategories[i].route) {
            this.sidebarActiveRoute[i] = true;
            this.highlightColor = this.contentCategories[i].color;
            this.activateMenuBarConfig(urlSegments[1]);
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


  /**
   * Creates string representations of CSS classes to be applied to elements.
   * Intended for the sidebar navigation elements. When one of those elements
   * isn't activated, it should have no background color.
   *
   * When the elements corresponding route is activated, the element should
   * have a background color corresponding to its category, as defined by
   * CATEGORIES.
   * @date 2/11/2024 - 7:00:33 AM
   *
   * @param {number} index The index in sidebarActiveRoute to check to see if this element
   * is currently active.
   * @param {number} hoverElevationValue The increase in background color elevation value to
   * be applied.
   * @param {number} activeElevationValue The elevation value in background color to use if
   * the element is currently active.
   * @returns {string} A string representation of the CSS classes to be applied to the element.
   */
  getSidebarNavItemBackgroundColorClass(index: number, hoverElevationValue: number, activeElevationValue: number): string {
    if(this.sidebarActiveRoute[index]) {
      return `bg-${this.highlightColor}-${activeElevationValue}
        hover:bg-${this.highlightColor}-${activeElevationValue + hoverElevationValue}
        text-white`
    } else {
      return `hover:bg-${this.contentCategories[index].color}-${hoverElevationValue}`
    }
  }


  /**
   * Creates a series of MenuItems for the BreadCrumb component for navigational overview.
   * The MenuItems are static and do not provide routerLinks.
   * @date 2/11/2024 - 6:49:48 AM
   *
   * @private
   * @param {string[]} urlSegments An array of route values to make MenuItems for.
   * @returns {MenuItem[]}
   */
  private constructBreadcrumbMenuItems(urlSegments: string[]): MenuItem[] {
    let items = []
    for(let i = 0; i < urlSegments.length; i++) {
      items.push(
        {
          label: this.breadcrumbTransformCase(urlSegments[i])
        }
      );
    }
    return items;
  }


  /**
   * Helper function to help format the text in breadcrumbs. Hyphens should be
   * replaced with spaces, and the segment should be titlecase. A special edgecase
   * is used to replace 'Tv' with 'TV'.
   * @date 2/11/2024 - 9:08:14 AM
   *
   * @private
   * @param {string} breadcrumb The breadcrumb to be transformed.
   * @returns {string} The transformed breadcrumb.
   */
  private breadcrumbTransformCase(breadcrumb: string): string {
    let wordsArray = breadcrumb.replace('-', ' ').split(' ')

    wordsArray = wordsArray.map(word => {
      return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
    });

    return wordsArray.join(' ').replace('Tv', 'TV');
  }

  /**
   * Given a route value, search the MenuBar config constant for a
   * corresponding route value. Set the corresponding index for the MenuBar
   * component to load.
   * @param baseRoute The route value to search for.
   */
  private activateMenuBarConfig(baseRoute: string): void {
    for(let i = 0; i < this.menuBarConfig.length; i++) {
      if(this.menuBarConfig[i].route === baseRoute) {
        this.menuBarConfigIndex = i;
      }
    }

    return;
  }
}
