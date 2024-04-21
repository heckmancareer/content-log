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
  private videoGameMasterSet: undefined;
  private tvShowMasterSet: undefined;
  private bookMasterSet: undefined;

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
   * @returns True if the entity is added. Returns false if the entity already exists, or if there's an error.
   */
  addNewEntity<T extends BasicEntity>(
    uuid: string,
    entity: new () => T,): boolean {
      let entityType = (entity as any).entityType
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

  updateEntity<T extends BasicEntity>(
    uuid: string,
    entity: new() => T,): boolean {
      let entityType = (entity as any).entityType
      switch(entityType) {
        case EntityType.Movie:
          if(!this.movieMasterSet[uuid]) {
            this.movieMasterSet[uuid] = (entity as unknown) as MovieEntity;
            return true;
          } else {
            return false;
          }
      }
      return false;
  }

  /**
   * Makes a call to retrieve all entity data from electron.
   * Intended to be run early in the application lifecycle.
   */
  loadInAllEntities(): void {

  }

}
