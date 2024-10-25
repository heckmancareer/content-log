import { Injectable } from '@angular/core';
import { StatusLoggerService } from './status-logger.service';
import { EntityType } from '../models/entity-type';

/**
 * This service is responsible for posting or receiving any updates
 * to electron via any of electron's api's.
 */
@Injectable({
  providedIn: 'root'
})
export class AngularElectronInterfaceService {
  private _electron: any;
  electronImagePath: string | undefined;

  private get electron(): any {
    if(!this._electron) {
      if(window && window.require) {
        this._electron = window.require('electron');
        return this._electron;
      }
      return null;
    }
    return this._electron;
  }

  constructor(private logger: StatusLoggerService) {}

  getGeneratedUUID(): Promise<string> {
    let electronInstance = this.electron;
    return new Promise((resolve, reject) => {
      electronInstance.ipcRenderer.invoke('GET-ENTITY-UUID').then((result: string) => {
        resolve(result);
      }).catch((error: unknown) => {
        console.log(`Error retrieving UUID.`);
        console.log(error);
        reject();
      })
    })
  }

  getElectronImagePath(): string {
    return this.electronImagePath as string;
  }

  async loadInElectronImagePath(): Promise<string> {
    if(!this.electronImagePath) {
      let electronInstance = this.electron;
      await electronInstance.ipcRenderer.invoke('GET-IMAGE-PATH').then((result: string) => {
        this.electronImagePath = result;
      })
    }
    return this.electronImagePath as string;
  }

  /**
   * An imageID is composed of an entity's name, after it's been limited to 25 characters,
   * substitutes whitespaces with hyphens, removed all non-numeric characters, changed to lower
   * case, followed by an underscore, then the movie uuid.
   * @param uuid The movie's uuid.
   * @returns A string for the imageID, as described above.
   */
  getFormattedImageID(uuid: string, entityName: string): string {
    let formattedEntityName = entityName.toLowerCase().trim()
      .replace(/ /g, '-').replace(/[^a-z0-9-]/g, '').substring(0, 25);
    return `${formattedEntityName}_${uuid}`;
  }

  getAllEntitiesOfType(entityType: EntityType): Promise<Record<string, any>> {
    let electronInstance = this.electron;
    return new Promise(async (resolve, reject) => {
      electronInstance.ipcRenderer.invoke('GET-ALL-ENTITIES-OF-TYPE', entityType)
        .then((result: Record<string, any>) => {
          resolve(result);
      }).catch((error: unknown) => {
        reject(error);
      })
    })
  }

  /**
   * With a given uuid and entity object, sends them to Electron for them
   * to be saved to the file system for persistent state.
   * @param uuid
   * @param entity
   * @returns A Promise. Resolves true if the Electron invocation is successful. Rejects
   * if there's an error.
   */
  sendEntityToFs(uuid: string, entity: any): Promise<boolean> {
    let electronInstance = this.electron;
    return new Promise(async (resolve, reject) => {
      electronInstance.ipcRenderer.invoke('SAVE-ENTITY', uuid, entity).then((result: boolean) => {
        if(result === true) {
          resolve(true);
        } else {
          this.logger.logMessageToConsole(
            `sendEntityToFs resolved false.`,
            false,
            `When sending entity to the fs to be saved, it resolved false.`,
            undefined,
            entity
          )
          resolve(false);
        }
      }).catch((error: unknown) => {
        this.logger.logErrorToConsole(
          `sendEntityToFs errored out.`,
          false,
          error as Error,
          `There was a problem calling sendEntityToFs in AngularElectron Service`,
          entity
        )
        reject(error);
      })
    });
  }

  sendImageBufferToFS(buffer: Buffer, entityType: EntityType, imageID: string): Promise<boolean> {
    let electronInstance = this.electron;
    return new Promise(async (resolve, reject) => {
      electronInstance.ipcRenderer.invoke('SAVE-IMAGE-BUFFER', buffer, entityType, imageID).then((result: boolean) => {
        if(result === true) {
          resolve(true);
        } else {
          resolve(false);
        }
      }).catch((error: unknown) => {
        reject(error);
      })
    })
  }

  updateImageNameInFS(entityType: EntityType, oldID: string, newID: string): Promise<boolean> {
    let electronInstance = this.electron;
    return new Promise(async (resolve, reject) => {
      if(oldID === '' || newID === '') resolve(false);
      electronInstance.ipcRenderer.invoke('UPDATE-IMAGE-FILENAME', oldID, newID, entityType).then((result: boolean) => {
        if(result === true) {
          resolve(true);
        } else {
          this.logger.logMessageToConsole(
            `updateImageNameInFS resolved false.`,
            false,
            `When updating an image name, it resolved false.`,
            undefined,
            newID
          )
          resolve(false);
        }
      }).catch((error: unknown) => {
        reject(error);
      })
    })
  }

  deleteImageFromFS(entityType: EntityType, imageID: string): Promise<boolean> {
    let electronInstance = this.electron;
    return new Promise(async (resolve, reject) => {
      if(imageID === '') resolve(false);
      electronInstance.ipcRenderer.invoke('DELETE-IMAGE', imageID, entityType).then((result: boolean) => {
        if(result === true) {
          console.log(`Image should be successfully deleted.`);
          resolve(true);
        } else {
          resolve(false);
        }
      }).catch((error: unknown) => {
        reject(error);
      })
    })
  }

  deleteEntityFromFS(uuid: string, entity: any): Promise<boolean> {
    let electronInstance = this.electron;
    return new Promise(async (resolve, reject) => {
      electronInstance.ipcRenderer.invoke('DELETE-ENTITY', uuid, entity.entityType).then((result: boolean) => {
        if(result === true) {
          resolve(true);
        } else {
          this.logger.logMessageToConsole(
            'deleteEntityFromFS resolved false.',
            false,
            'When sending entity to the fs to be deleted, it resolved false.',
            undefined,
            entity
          )
          resolve(false);
        }
      }).catch((error: unknown) => {
        reject(error);
      })
    })
  }

  removeEntitiesImageFromStorage(entityType: EntityType, uuid: string): Promise<boolean> {
    let electronInstance = this.electron;
    return new Promise(async (resolve, reject) => {
      electronInstance.ipcRenderer.invoke('REMOVE-IMAGE-ID', uuid, entityType).then((result: boolean) => {
        if(result === true) {
          console.log('ImageID should be successfully removed.');
          resolve(true);
        } else {
          resolve(false);
        }
      }).catch((error: unknown) => {
        reject(error);
      })
    })
  }
}
