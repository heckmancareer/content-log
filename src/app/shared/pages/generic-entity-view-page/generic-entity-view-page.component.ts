import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MasterDataManagementService } from '../../services/master-data-management.service';
import { EntityType } from '../../models/entity-type';
import { Subscription, takeUntil, Subject, finalize, switchMap, of } from 'rxjs';
import { CategoriesManagementService } from '../../services/categories-management.service';
import { MOVIE_ENTITY_SORT, TV_SHOW_ENTITY_SORT, BOOK_ENTITY_SORT, VIDEO_GAME_ENTITY_SORT } from './sort-values';
import { sortEntityKeys } from '../../helpers/sort-entity-keys';
import { NavigationService } from '../../services/navigation.service';
import { EntityFilterCriteria } from '../../helpers/entity-filter-criteria';

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

  allEntityKeys: string[] = [];
  filteredEntityKeys: string[] = [];
  entities: Record<string, any> = {};

  filterGenres: string[] = [];
  filterTags: string[] = [];

  sortOptions: any = MOVIE_ENTITY_SORT;
  selectedSortOption: string | undefined = 'userDateAdded';
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
  sortOrderDisabled: boolean = false;
  selectedSortOrder: 'ascending' | 'descending' = 'descending';

  constructor(
    private activatedRoute: ActivatedRoute,
    private masterDataManagementService: MasterDataManagementService,
    private categoriesManagementService: CategoriesManagementService,
    private navigationService: NavigationService,
  ){}

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
        this.allEntityKeys = Object.keys(this.entities);
        this.filteredEntityKeys = Object.keys(this.entities);
        switch(this.currentEntityType) {
          case(EntityType.Movie):
            this.sortOptions = MOVIE_ENTITY_SORT
            break
          case(EntityType.Book):
            this.sortOptions = BOOK_ENTITY_SORT
            break
          case(EntityType.TVShow):
            this.sortOptions = TV_SHOW_ENTITY_SORT
            break
          case(EntityType.VideoGame):
            this.sortOptions = VIDEO_GAME_ENTITY_SORT
            break
        }

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
        this.invokeSorting();
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
    console.log(this.selectedSortOption);
    this.sortOrderDisabled = false;
    this.invokeSorting();
  }

  onSortOrderSelect($event: unknown): void {
    this.invokeSorting();
  }

  resetSort(): void {
    this.selectedSortOption = undefined;
    this.selectedSortOrder = 'descending';
    this.sortOrderDisabled = true;
    this.allEntityKeys = Object.keys(this.entities);
  }

  navigateToEntityEdit(entity: any, entityUUID: string) {
    this.navigationService.navigateToEntityEditing(entity.entityType, entity, entityUUID);
  }

  applyFilters($event: EntityFilterCriteria): void {
    this.filteredEntityKeys = this.allEntityKeys.filter((entityKey: any) => {
      const entity = this.entities[entityKey];
      return $event.evaluateEntity(entity);
    })
  }

  resetFilters(): void {
    this.filteredEntityKeys = [...this.allEntityKeys];
  }

  private invokeSorting(): void {
    this.allEntityKeys = sortEntityKeys(this.entities, this.allEntityKeys, this.selectedSortOption as string, this.selectedSortOrder);
  }

}
