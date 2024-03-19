import { Injectable } from '@angular/core';
import * as Electron from 'electron';

/**
 * This service is responsable for posting or receiving any updates
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
}
