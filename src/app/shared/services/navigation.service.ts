import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { BasicEntity } from '../models/basic-entity';
import { EntityEditingService } from './entity-editing.service';
import { EntityType } from '../models/entity-type';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(
    private location: Location,
    private entityEditingService: EntityEditingService,
    private router: Router,
  ) { }

  navigateToPreviousPage(): void {
    this.location.back();
  }

  navigateToEntityEditing<T extends BasicEntity>(entityToEditType: EntityType, entityToEdit?: T, entityToEditUUID?: string): void {
    if(entityToEditUUID) this.entityEditingService.setCurrentEntityUUID(entityToEditUUID);
    if(entityToEdit) this.entityEditingService.setCurrentEntity(entityToEdit);
    switch(entityToEditType) {
      case EntityType.Movie:
        console.log(this.entityEditingService.getCurrentEntity())
        console.log(this.entityEditingService.getCurrentEntityUUID());
        this.router.navigateByUrl(`/movies/new-movie`);
        break;
    }
  }
}
