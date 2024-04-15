import { Injectable } from '@angular/core';
import { MovieEntity } from '../../modules/movies/models/movie-entity';
import { EntityType } from '../models/entity-type';
import { BasicEntity } from '../models/basic-entity';

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

  /**
   * Adds an entity to its respective Record for its entity type.
   * @param uuid The UUID of the entity.
   * @param entity The object of the entity.
   * @param entityType The entity type of the entity.
   * @returns True if the entity is added successfully, or false if there's an error.
   */
  addNewEntity<T extends BasicEntity>(
    uuid: string,
    entity: new () => T,
    entityType: EntityType): boolean {
      switch(entityType) {
        case EntityType.Movie:
          if(this.movieMasterSet[uuid]) {
            return false;
          } else {
            this.movieMasterSet[uuid] = (entity as unknown) as MovieEntity;
            return true;
          }
      }
      return false;
  }
}
