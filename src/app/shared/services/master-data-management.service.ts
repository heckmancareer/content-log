import { Injectable } from '@angular/core';
import { MovieEntity } from '../../modules/movies/models/movie-entity';
import { EntityType } from '../models/entity-type';
import { BasicEntity } from '../models/basic-entity';
import { AngularElectronInterfaceService } from './angular-electron-interface.service';
import { VideoGameEntity } from '../../modules/video-games/models/video-game-entity';
import { TVShowEntity } from '../../modules/tv-shows/models/tv-show-entity';
import { BookEntity } from '../../modules/books/models/book-entity';

/**
 * This service is responsible for holding all data about all content
 * entries in memory for user browsing, viewing, and editing.
 */
@Injectable({
  providedIn: 'root'
})
export class MasterDataManagementService {
  private movieMasterSet: Record<string, MovieEntity> = {};
  private videoGameMasterSet: Record<string, VideoGameEntity> = {};
  private tvShowMasterSet: Record<string, TVShowEntity> = {};
  private bookMasterSet: Record<string, BookEntity> = {};

  constructor(private angularElectronInterface: AngularElectronInterfaceService) {}

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
    return this.movieMasterSet;
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
        masterSet[uuid] = {};
        Object.assign(masterSet[uuid], entity);
        masterSet[uuid] = this.castPlainObjectToEntityObject(masterSet[uuid]);
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
        masterSet[uuid] = {};
        Object.assign(masterSet[uuid], entity);
        masterSet[uuid] = this.castPlainObjectToEntityObject(masterSet[uuid]);
        return true;
      }
      return false;
  }

  /**
   * Deletes an entity from memory. Returns false if the entity doesn't exist,
   * or failed to be deleted.
   * @param uuid
   * @param entity
   */
  deleteEntity<T extends BasicEntity>(
    uuid: string,
    entity: T
  ): boolean {
    let entityType = entity.entityType;
    let masterSet = this.entityTypeToMasterSet(entityType);
    if(!masterSet[uuid]) {
      return false;
    } else {
      delete masterSet[uuid];
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

  removeEntityImage<T extends BasicEntity>(
    uuid: string,
    entityType: EntityType
  ): boolean {
    let masterSet = this.entityTypeToMasterSet(entityType);
    if(masterSet[uuid]) {
      masterSet[uuid].hasImage = false;
      masterSet[uuid].imageID = '';
      return true;
    } else {
      return false;
    }
  }

  /**
   * Given an object, this function will attempt to invoke the corresponding
   * 'fromPlainObject' function from the corresponding 'entityType'. If 'entityType' is undefined,
   *  return false.
   * @param entity
   */
  castPlainObjectToEntityObject(entity: any): any {
    if(entity.entityType) {
      try {
        switch(entity.entityType) {
          case(EntityType.Movie):
            return MovieEntity.fromPlainObject(entity);
          case(EntityType.VideoGame):
            return VideoGameEntity.fromPlainObject(entity);
          case(EntityType.TVShow):
            return TVShowEntity.fromPlainObject(entity);
          case(EntityType.Book):
            return BookEntity.fromPlainObject(entity);
        }
      } catch(error) {
        console.log(`Error when trying to cast plain object to entity object.`);
      }
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
    for(const key of Object.keys(this.movieMasterSet)) {
      this.movieMasterSet[key] = MovieEntity.fromPlainObject(this.movieMasterSet[key]);
    }
    this.videoGameMasterSet = await this.angularElectronInterface.getAllEntitiesOfType(EntityType.VideoGame);
    for(const key of Object.keys(this.videoGameMasterSet)) {
      this.videoGameMasterSet[key] = VideoGameEntity.fromPlainObject(this.videoGameMasterSet[key]);
    }
    this.bookMasterSet = await this.angularElectronInterface.getAllEntitiesOfType(EntityType.Book);
    for(const key of Object.keys(this.bookMasterSet)) {
      this.bookMasterSet[key] = BookEntity.fromPlainObject(this.bookMasterSet[key]);
    }
    this.tvShowMasterSet = await this.angularElectronInterface.getAllEntitiesOfType(EntityType.TVShow);
    for(const key of Object.keys(this.tvShowMasterSet)) {
      this.tvShowMasterSet[key] = TVShowEntity.fromPlainObject(this.tvShowMasterSet[key]);
    }
    console.log(this.movieMasterSet);
    console.log(this.videoGameMasterSet);
    console.log(this.bookMasterSet);
    console.log(this.tvShowMasterSet);
    return true;
  }

  getEntityFullImagePath<T extends BasicEntity>(entity: T): string | false {
    if(entity == undefined || !entity.hasImage) return false;
    let baseImagePath = this.angularElectronInterface.getElectronImagePath();
    let fullImagePath = `${baseImagePath}\\${entity.entityType}\\${entity.imageID}.png`
    return fullImagePath;
  }
}

export function initializeData(
  dataService: MasterDataManagementService,
  angularElectron: AngularElectronInterfaceService) {
  return async (): Promise<any> => {
    await angularElectron.loadInElectronImagePath();
    return dataService.loadInAllEntities()
  };
}
