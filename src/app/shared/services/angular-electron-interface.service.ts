import { Injectable } from '@angular/core';
import * as Electron from 'electron';
import { MovieEntity } from '../../modules/movies/models/movie-entity';
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

  /**
   * An imageID is composed of an entity's name, after it's been limited to 25 characters,
   * substitutes whitespaces with hyphens, removed all non-numeric characters, changed to lower
   * case, followed by an underscore, then the movie uuid.
   * @param uuid The movie's uuid.
   * @returns A string for the imageID, as described above.
   */
  getFormattedImageID(uuid: string, entityName: string): string {
    let formattedEntityName = entityName.toLowerCase().trim()
      .replace(/ /g, '-').replace(/[^a-z-]/g, '').substring(0, 25);
    return `${formattedEntityName}_${uuid}`;
  }

  getAllEntitiesOfType(entityType: EntityType): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {

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
}
