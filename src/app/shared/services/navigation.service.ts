import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { BasicEntity } from '../models/basic-entity';
import { EntityEditingService } from './entity-editing.service';
import { EntityType } from '../models/entity-type';
import { MovieEntity } from '../../modules/movies/models/movie-entity';
import { TVShowEntity } from '../../modules/tv-shows/models/tv-show-entity';
import { BookEntity } from '../../modules/books/models/book-entity';
import { VideoGameEntity } from '../../modules/video-games/models/video-game-entity';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  ignoreNextUnsavedGuard: boolean = false;

  constructor(
    private location: Location,
    private entityEditingService: EntityEditingService,
    private router: Router,
  ) { }

  navigateToPreviousPage(): void {
    this.location.back();
  }

  navigateToEntityEditing(entityToEditType: EntityType, entityToEdit?: unknown, entityToEditUUID?: string): void {
    if(entityToEditUUID) this.entityEditingService.setCurrentEntityUUID(entityToEditUUID);
    switch(entityToEditType) {
      case EntityType.Movie:
        if(entityToEdit) this.entityEditingService.setCurrentMovieEntity(entityToEdit as MovieEntity);
        this.router.navigateByUrl(`/movies/edit-movie`);
        break;
      case EntityType.TVShow:
        if(entityToEdit) this.entityEditingService.setCurrentTVShowEntity(entityToEdit as TVShowEntity);
        this.router.navigateByUrl('/tv-shows/edit-tv-show');
        break;
      case EntityType.Book:
        if(entityToEdit) this.entityEditingService.setCurrentBookEntity(entityToEdit as BookEntity);
        this.router.navigateByUrl('/book/edit-book');
        break;
      case EntityType.VideoGame:
        if(entityToEdit) this.entityEditingService.setCurrentVideoGameEntity(entityToEdit as VideoGameEntity);
        this.router.navigateByUrl('/video-game/edit-video-game');
        break;
    }
  }


  /**
   * The flag 'ignoreNextUnsavedGuard' is used by the system to check to see
   * if navigation should ignore the next instance of 'Are you sure you want to leave this page?'.
   * Whenever this is checked, if it returns true, it's turned off to false and the flag needs
   * to be set again.
   * @returns {boolean}
   */
  checkIgnore(): boolean {
    if(this.ignoreNextUnsavedGuard) {
      this.ignoreNextUnsavedGuard = false;
      return true;
    } else {
      return false;
    }
  }

  enableIgnore(): void {
    this.ignoreNextUnsavedGuard = true;
  }
}
