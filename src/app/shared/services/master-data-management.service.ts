import { Injectable } from '@angular/core';
import { MovieEntity } from '../../modules/movies/models/movie-entity';
import { EntityType } from '../models/entity-type';
import { BasicEntity } from '../models/basic-entity';
import { AngularElectronInterfaceService } from './angular-electron-interface.service';

/**
 * This service is responsible for holding all data about all content
 * entries in memory for user browsing, viewing, and editing.
 */
@Injectable({
  providedIn: 'root'
})
export class MasterDataManagementService {
  private movieMasterSet: Record<string, MovieEntity> = {};
  private videoGameMasterSet: Record<string, MovieEntity> = {};
  private tvShowMasterSet: Record<string, MovieEntity> = {};
  private bookMasterSet: Record<string, MovieEntity> = {};

  constructor(private angularElectronInterface: AngularElectronInterfaceService) { }

  /**
   * Given an entity type, returns the corresponding masterSet variable.
   * @param entityType The entityType to convert to a returned variable.
   */
  private entityTypeToMasterSet(entityType: EntityType): Record<string, any> {
    switch(entityType) {
      case(EntityType.Movie):
        return this.movieMasterSet;
      case(EntityType.VideoGame):
        return this.videoGameMasterSet;
      case(EntityType.TVShow):
        return this.tvShowMasterSet;
      case(EntityType.Book):
        return this.bookMasterSet;
    }
  }

  /**
   * Adds an entity to its respective Record for its entity type.
   * @param uuid The UUID of the entity.
   * @param entity The object of the entity.
   * @returns True if the entity is added. Returns false if the entity already exists, or if there's an error.
   */
  addNewEntity<T extends BasicEntity>(
    uuid: string,
    entity: T,): boolean {
      let entityType = entity.entityType;
      let masterSet = this.entityTypeToMasterSet(entityType);
      if(masterSet[uuid]) {
        return false;
      } else {
        Object.assign(masterSet[uuid], entity);
        return true;
      }
      return false;
  }

  /**
   * Updates a pre-existing entity Record.
   * @param uuid  The UUID of the entity.
   * @param entity The object of the entity.
   * @returns True if the entity is updated. Returns false if the entity doesn't exist,
   * or if there's an error.
   */
  updateEntity<T extends BasicEntity>(
    uuid: string,
    entity: T,): boolean {
      let entityType = entity.entityType;
      let masterSet = this.entityTypeToMasterSet(entityType);
      if(!masterSet[uuid]) {
        return false;
      } else {
        delete masterSet[uuid];
        Object.assign(masterSet[uuid], entity);
        return true;
      }
      return false;
  }

  /**
   * Returns a deep copy of an entity, not a reference.
   * @param uuid The uuid of the Entity.
   * @param entityType The type of the Entity you're trying to retrieve.
   * @returns A new object that's a deep copy of the entity.
   */
  getEntity<T extends BasicEntity>(
    uuid: string,
    entityType: EntityType
  ): T | boolean {
    let masterSet = this.entityTypeToMasterSet(entityType);
    if(masterSet[uuid]) {
      return Object.assign({}, masterSet[uuid]);
    } else {
      return false;
    }
  }

  /**
   * Returns a set of entities. Should only be used to read those
   * sets.
   * @param entityType The kind of set to view.
   * @returns The corresponding entity set.
   */
  getEntitySetReference<T extends BasicEntity>(entityType: EntityType): Readonly<Record<string, T>> {
    return this.entityTypeToMasterSet(entityType);
  }

  /**
   * Makes a call to retrieve all entity data from electron.
   * Intended to be run early in the application lifecycle.
   */
  async loadInAllEntities(): Promise<boolean> {
    this.movieMasterSet = await this.angularElectronInterface.getAllEntitiesOfType(EntityType.Movie);
    // this.tvShowMasterSet = await this.angularElectronInterface.getAllEntitiesOfType(EntityType.Movie);
    // this.videoGameMasterSet = await this.angularElectronInterface.getAllEntitiesOfType(EntityType.Movie);
    // this.bookMasterSet = await this.angularElectronInterface.getAllEntitiesOfType(EntityType.Movie);
    return true;
  }

}
