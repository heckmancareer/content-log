import { Injectable } from '@angular/core';
import { MovieEntity } from '../../modules/movies/models/movie-entity';
import { EntityType } from '../models/entity-type';

/**
 * This service is responsible for holding all data about all content
 * entries in memory for user browsing, viewing, and editing.
 */
@Injectable({
  providedIn: 'root'
})
export class MasterDataManagementService {
  private movieMasterSet: Record<string, MovieEntity> = {};

  constructor() { }

  hasEntity(uuid: string, entityType: EntityType): boolean {
    switch(entityType) {
      case EntityType.Movie:
        return this.movieMasterSet[uuid] !== undefined;
    }

    return false;
  }
}
