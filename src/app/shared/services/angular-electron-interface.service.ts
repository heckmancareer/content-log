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

  constructor() { }

  testConnection(): void {
    this.electron.ipcRenderer.send('hello-world', 'Hello from Angular!');
  }

  /**
   * Send an image blob to the Electron ipc process to have the user
   * save the resulting image file to their file system.
   * @param blob The blob to be converted to an image
   */
  sendBlobToFileSystem(blob: Blob): void {
    this.convertImageBlobToBuffer(blob).then(buffer => {
      (window as any).electron.ipcRenderer.send('save-file', buffer);
    })
  }

  /**
   * Attempts to convert an image blob into a Buffer object, since the Node.js 'fs'
   * module works with Buffers.
   * @param blob The blob to be converted.
   * @returns A Promise that resolves when the conversion from blob to buffer is complete.
   */
  private convertImageBlobToBuffer(blob: Blob): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(Buffer.from(reader.result as ArrayBuffer));
      reader.onerror = reject;
      reader.readAsArrayBuffer(blob);
      resolve;
    });
  }
}
