import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MasterDataManagementService } from '../../services/master-data-management.service';
import { EntityType } from '../../models/entity-type';

@Component({
  selector: 'app-generic-entity-view-page',
  templateUrl: './generic-entity-view-page.component.html',
  styleUrl: './generic-entity-view-page.component.scss'
})
export class GenericEntityViewPageComponent implements OnInit {
  currentEntityType: EntityType = EntityType.Movie;
  loadingState: boolean = true;
  activatedRouteData: any = {};

  entityKeys: string[] = [];
  entities: Record<string, any> = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private masterDataManagementService: MasterDataManagementService){}

  /**
   * On Init, get the data parameter associated with the route
   * to determine the entity type to view.
   */
  ngOnInit(): void {
    this.loadingState = true;
    this.activatedRoute.data.subscribe((data) => {
      this.activatedRouteData = data;
      this.currentEntityType = data.entityType;
      this.entities = this.masterDataManagementService.getEntitySetReference(this.currentEntityType);
      this.entityKeys = Object.keys(this.entities);
      this.loadingState = false;
    })
  }
}
