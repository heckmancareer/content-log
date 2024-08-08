import { Injectable } from '@angular/core';
import { MasterDataManagementService } from './master-data-management.service';
import { AngularElectronInterfaceService } from './angular-electron-interface.service';
import { StatusLoggerService } from './status-logger.service';
import { EntityType } from '../models/entity-type';
import { BasicEntity } from '../models/basic-entity';
import { MovieEntity } from '../../modules/movies/models/movie-entity';

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
      entity.imageID = this.angularElectronInterface.getFormattedImageID(currentUUID, entity.title);
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

  submitImageBufferForSaving(buffer: Buffer, entityType: EntityType, imageID: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      await this.angularElectronInterface.sendImageBufferToFS(buffer, entityType, imageID).then((result) => {
        resolve(true);
      }).catch((error) => {
        reject(error);
      })
    })
  }
}
