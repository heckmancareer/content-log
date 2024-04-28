import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MasterDataManagementService } from '../../services/master-data-management.service';
import { EntityType } from '../../models/entity-type';
import { Subscription } from 'rxjs';
import { CategoriesManagementService } from '../../services/categories-management.service';

@Component({
  selector: 'app-generic-entity-view-page',
  templateUrl: './generic-entity-view-page.component.html',
  styleUrl: './generic-entity-view-page.component.scss'
})
export class GenericEntityViewPageComponent implements OnInit {
  routeSub!: Subscription;
  categoriesSub!: Subscription;
  currentEntityType: EntityType = EntityType.Movie;
  loadingState: boolean = true;
  activatedRouteData: any = {};

  entityKeys: string[] = [];
  entities: Record<string, any> = {};

  filterGenres: string[] = [];
  filterTags: string[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private masterDataManagementService: MasterDataManagementService,
    private categoriesManagementService: CategoriesManagementService){}

  /**
   * On Init, get the data parameter associated with the route
   * to determine the entity type to view.
   */
  ngOnInit(): void {
    this.loadingState = true;
    this.routeSub = this.activatedRoute.data.subscribe((data) => {
      this.activatedRouteData = data;
      this.currentEntityType = data.entityType;
      this.entities = this.masterDataManagementService.getEntitySetReference(this.currentEntityType);
      this.entityKeys = Object.keys(this.entities);

      // Check to see if the Categories Management service is done loading.
      // If so, get all genres and tags.
      // If not, subscribe to its readiness, and wait for an event to be emitted.
      if(!this.categoriesManagementService.areCategoriesReady()) {
        this.categoriesSub = this.categoriesManagementService.categoriesReadiness.subscribe(ready => {
          this.retrieveCategories();
        })
      } else {
        this.retrieveCategories();
      }
    })
  }

  private retrieveCategories(): void {
    this.filterGenres = this.categoriesManagementService.getAllGenres(this.currentEntityType);
    this.filterTags = this.categoriesManagementService.getAllTags(this.currentEntityType);
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    if(this.categoriesSub) this.categoriesSub.unsubscribe();
  }
}
