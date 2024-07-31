import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { BasicEntity } from '../models/basic-entity';
import { EntityEditingService } from './entity-editing.service';
import { EntityType } from '../models/entity-type';
import { MovieEntity } from '../../modules/movies/models/movie-entity';

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

  navigateToEntityEditing(entityToEditType: EntityType, entityToEdit?: unknown, entityToEditUUID?: string): void {
    switch(entityToEditType) {
      case EntityType.Movie:
        if(entityToEditUUID) this.entityEditingService.setCurrentEntityUUID(entityToEditUUID);
        if(entityToEdit) this.entityEditingService.setCurrentMovieEntity(entityToEdit as MovieEntity);
        this.router.navigateByUrl(`/movies/new-movie`);
        break;
    }
  }
}
