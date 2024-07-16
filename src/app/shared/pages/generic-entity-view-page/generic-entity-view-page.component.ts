import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MasterDataManagementService } from '../../services/master-data-management.service';
import { EntityType } from '../../models/entity-type';
import { Subscription, takeUntil, Subject, finalize, switchMap, of } from 'rxjs';
import { CategoriesManagementService } from '../../services/categories-management.service';
import { MOVIE_ENTITY_SORT } from './sort-values';
import { sortEntityKeys } from '../../helpers/sort-entity-keys';

@Component({
  selector: 'app-generic-entity-view-page',
  templateUrl: './generic-entity-view-page.component.html',
  styleUrl: './generic-entity-view-page.component.scss'
})
export class GenericEntityViewPageComponent implements OnInit {
  private destroy$ = new Subject<void>();
  routeSub!: Subscription;
  currentEntityType: EntityType = EntityType.Movie;
  loadingState: boolean = true;
  activatedRouteData: any = {};

  entityKeys: string[] = [];
  entities: Record<string, any> = {};

  filterGenres: string[] = [];
  filterTags: string[] = [];

  sortOptions: any = MOVIE_ENTITY_SORT;
  selectedSortOption: string | undefined;
  sortOrder: any[] = [
    {
      label: 'Ascending',
      value: 'ascending'
    },
    {
      label: 'Descending',
      value: 'descending'
    }
  ]
  sortOrderDisabled: boolean = true;
  selectedSortOrder: 'ascending' | 'descending' = 'ascending';

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

    this.routeSub = this.activatedRoute.data.pipe(
      takeUntil(this.destroy$),
      finalize(() => this.loadingState = false),
      switchMap((data) => {
        this.activatedRouteData = data;
        this.currentEntityType = data.entityType;
        this.entities = this.masterDataManagementService.getEntitySetReference(this.currentEntityType);
        this.entityKeys = Object.keys(this.entities);

        if(!this.categoriesManagementService.areCategoriesReady()) {
          return this.categoriesManagementService.categoriesReadiness;
        } else {
          this.retrieveCategories();
          return of(null);
        }
      })
    ).subscribe({
      next: (ready) => {
        if(ready) this.retrieveCategories();
      },
      error: (error) => {
        console.error(`Error in subscription for categories.`);
      }
    })
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }

  private retrieveCategories(): void {
    this.filterGenres = this.categoriesManagementService.getAllGenres(this.currentEntityType);
    this.filterTags = this.categoriesManagementService.getAllTags(this.currentEntityType);
  }

  onSortOptionSelect($event: unknown): void {
    this.sortOrderDisabled = false;
    this.invokeSorting();
  }

  onSortOrderSelect($event: unknown): void {
    this.invokeSorting();
  }

  resetSort(): void {
    this.selectedSortOption = undefined;
    this.selectedSortOrder = 'ascending';
    this.sortOrderDisabled = true;
  }

  invokeSorting(): void {
    this.entityKeys = sortEntityKeys(this.entities, this.entityKeys, this.selectedSortOption as string, this.selectedSortOrder)
  }

}
