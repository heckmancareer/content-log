import {app, ipcMain} from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import { ENTITY_MANAGER } from '../storage/entity-store';

export function registerAllIpcSaveFunctions() {

  ipcMain.handle('SAVE-ENTITY', async(event, uuid, entity) => {
    console.log(`SAVE-ENTITY called.`)
    ENTITY_MANAGER.saveEntity(uuid, entity);
    return true;
  })

  ipcMain.handle('SAVE-IMAGE-BUFFER', async(event, imageBuffer, entityType, imageID) => {
    let baseImagePath = path.join(app.getPath('userData'), 'images', entityType);
    let fullImagePath = path.join(baseImagePath, `${imageID}.png`);
    ensureDirectoryExists(baseImagePath);
    fs.writeFile(fullImagePath, imageBuffer, err => {
      if(err) {
        console.error(err);
        return false;
      } else {
        console.log('File save success.');
        return true;
      }
    })
  })

}

function ensureDirectoryExists(path: string): void {
  if(!fs.existsSync(path)) {
    fs.mkdirSync(path, {recursive: true});
  }
}
