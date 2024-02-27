import { Injectable } from '@angular/core';
import * as Electron from 'electron';

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
