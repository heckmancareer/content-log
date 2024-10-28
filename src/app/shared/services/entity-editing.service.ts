import { Injectable } from '@angular/core';
import { MasterDataManagementService } from './master-data-management.service';
import { AngularElectronInterfaceService } from './angular-electron-interface.service';
import { StatusLoggerService } from './status-logger.service';
import { EntityType } from '../models/entity-type';
import { BasicEntity } from '../models/basic-entity';
import { MovieEntity } from '../../modules/movies/models/movie-entity';
import { TVShowEntity } from '../../modules/tv-shows/models/tv-show-entity';
import { VideoGameEntity } from '../../modules/video-games/models/video-game-entity';
import { BookEntity } from '../../modules/books/models/book-entity';

/**
 * This service is responsible for handling edits to entities
 * via forms, and saving them to the fs.
 */
@Injectable({
  providedIn: 'root'
})
export class EntityEditingService {

  private currentEntityUUID: string | undefined;
  private currentEntity: any | undefined;

  constructor(
    private masterDataManagement: MasterDataManagementService,
    private angularElectronInterface: AngularElectronInterfaceService,
    private logger: StatusLoggerService
  ) { }

  getCurrentEntityUUID(): string | void {
    if(this.currentEntityUUID) {
      return this.currentEntityUUID;
    } else {
      this.logger.logErrorToConsole(
        'No current entity being edited',
        false,
        undefined,
        'getCurrentEntityUUID was called from the Entity Editing service, but no UUID is currently set.'
      )
      return;
    }
  }

  setCurrentEntityUUID(uuid: string): void {
    this.currentEntityUUID = uuid;
  }

  clearCurrentEntity(): void {
    this.currentEntityUUID = undefined;
    this.currentEntity = undefined;
  }

  getCurrentEntity(): any {
    return this.currentEntity;
  }

  getCurrentEntityFullImagePath(): string {
    let pathFetch = this.masterDataManagement.getEntityFullImagePath(this.currentEntity);
    return pathFetch ? pathFetch : '';
  }

  setCurrentEntity<T extends BasicEntity>(entity: T): void {
    this.currentEntity = Object.assign({}, entity);
  }

  setCurrentMovieEntity(entity: MovieEntity): void {
    console.log(`Object before assignment: `);
    console.log(entity);
    this.currentEntity = MovieEntity.fromPlainObject(entity);
    console.log(`Object after assignment: `);
    console.log(this.currentEntity)
  }

  setCurrentTVShowEntity(entity: TVShowEntity): void {
    this.currentEntity = TVShowEntity.fromPlainObject(entity);
  }

  setCurrentVideoGameEntity(entity: VideoGameEntity): void {
    this.currentEntity = VideoGameEntity.fromPlainObject(entity);
  }

  setCurrentBookEntity(entity: BookEntity): void {
    this.currentEntity = BookEntity.fromPlainObject(entity);
  }

  hasCurrentEntity(): boolean {
    return this.currentEntity !== undefined && this.currentEntityUUID !== undefined;
  }

  /**
   * Function to submit an entity to the file system to be saved.
   * If this is a new entity, submit an empty string for the UUID. Then
   * one will be generated.
   * @param uuid
   * @param entity
   * @returns
   */
  submitEntityForSaving(uuid: string, entity: any): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      let currentUUID = uuid;
      let isNewEntity = false;
      // If UUID is blank, or does not exist in data, then it's a new entity.
      // So get a new UUID, and generate the image name.
      if(uuid === '') {
        await this.angularElectronInterface.getGeneratedUUID().then((result) => {
          currentUUID = result;
          isNewEntity = true;
        })
      }
      // Ensure that the image ID for the entity is up to date.
      let currentImageID = this.angularElectronInterface.getFormattedImageID(currentUUID, entity.title);
      // If entity has image, and it has a new imageID from a change in title, then go find the image in
      // the fs and rename it to the new imageID. On success, update
      if(entity.hasImage && entity.imageID !== '' && entity.imageID !== currentImageID) {
        await this.angularElectronInterface.updateImageNameInFS(entity.entityType, entity.imageID, currentImageID)
          .then((result) => {
            console.log(`Image id should be updated from ${entity.imageID} to ${currentImageID}`);
        }).catch((error) => {
          console.log(error);
          reject(error);
        })
      }
      entity.imageID = currentImageID;
      // Send the entity to electron to be saved.
      await this.angularElectronInterface.sendEntityToFs(currentUUID, entity).then((result) =>{
        if(isNewEntity) {
          this.masterDataManagement.addNewEntity(currentUUID, entity);
        } else {
          this.masterDataManagement.updateEntity(currentUUID, entity);
        }
        resolve(true);
      }).catch((error) => {
        reject(error);
      });
    })
  }

  submitEntityForDeletion(uuid: string, entity: any): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      if(entity.hasImage && entity.imageID !== '') {
        await this.submitImageIDForDeletion(entity.entityType, entity.imageID, uuid);
      }
      await this.angularElectronInterface.deleteEntityFromFS(uuid, entity).then((result) => {
        console.log(`Entity ${uuid} should be deleted from the FS.`);
        this.masterDataManagement.deleteEntity(uuid, entity);
        resolve(true);
      }).catch((error) => {
        reject(error);
      })
    })
  }

  submitImageBufferForSaving(buffer: Buffer, entityType: EntityType, imageID: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      await this.angularElectronInterface.sendImageBufferToFS(buffer, entityType, imageID).then((result) => {
        resolve(true);
      }).catch((error) => {
        reject(error);
      })
    })
  }


  /**
   * First, attempts to delte an image by ImageID from the FS. Then, tries to update
   * the entry in the db by removing the imageID, and hasImage flag, since these need
   * to be changed even before the 'Save' submission.
   *
   * @param {EntityType} entityType
   * @param {string} imageID
   * @returns {Promise<boolean>}
   */
  submitImageIDForDeletion(entityType: EntityType, imageID: string, uuid: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      await this.angularElectronInterface.deleteImageFromFS(entityType, imageID).then((result) => {})
        .catch((error) => {
          reject(error);
        })
      await this.angularElectronInterface.removeEntitiesImageFromStorage(entityType, uuid).then((result) => {
        if(this.masterDataManagement.removeEntityImage(uuid, entityType)) {
          resolve(true);
        } else {
          reject(false);
        }
      }).catch((error) => {
        reject(error);
      })
    })
  }
}
