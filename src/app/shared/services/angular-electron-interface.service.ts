import { Injectable } from '@angular/core';
import * as Electron from 'electron';
import { MovieEntity } from '../../modules/movies/models/movie-entity';

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

  constructor() {}

  /**
   * Saves an image blob url to the file system.
   * Given an image blob url, convert it to a buffer then send it to Electron
   * via the ipc renderer to have it saved to the file system.
   * @param blobURL
   */
  sendBlobURLToFileSystem(blobURL: string): void {
    let electronInstance = this.electron;
    let reader = new FileReader();

    reader.onload = function () {
      if(reader.readyState == 2) {
        let buffer = Buffer.from(reader.result as ArrayBuffer);
        electronInstance.ipcRenderer.send('SAVE-BUFFER-TO-FS', buffer);
      }
    }

    fetch(blobURL).then(response => response.blob()).then(blob => {
      reader.readAsArrayBuffer(blob);
    }).catch(error => {
      console.log(error);
    })
  }

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

  sendEntityToFs(uuid: string, entity: any): Promise<boolean> {
    let electronInstance = this.electron;
    return new Promise(async (resolve, reject) => {
      electronInstance.ipcRenderer.invoke('SAVE-ENTITY', uuid, entity, entity).then((result: boolean) => {
        resolve(true);
      }).catch((error: unknown) => {
        console.log(`Error saving entity.`)
        console.log(error);
        reject(false);
      })
    });
  }
}
