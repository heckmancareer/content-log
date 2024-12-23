import {app, ipcMain} from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import { ENTITY_MANAGER } from '../storage/entity-store';

export function registerAllIpcUpdateFunctions() {

  ipcMain.handle('UPDATE-IMAGE-FILENAME', async(event, oldName, newName, entityType) => {
    let baseImagePath = path.join(app.getPath('userData'), 'images', entityType);
    let oldPath = path.join(baseImagePath, `${oldName}.png`);
    let newPath = path.join(baseImagePath, `${newName}.png`);
    try {
      fs.renameSync(oldPath, newPath);
      return true;
    } catch(err) {
      console.log(err);
      return false;
    }
  });


  ipcMain.handle('DELETE-IMAGE', async(event, imageID, entityType) => {
    let baseImagePath = path.join(app.getPath('userData'), 'images', entityType);
    let fullImagePath = path.join(baseImagePath, `${imageID}.png`);
    try {
      fs.unlinkSync(fullImagePath);
      return true;
    } catch(err) {
      console.log(err);
      return false;
    }
  })

  ipcMain.handle('REMOVE-IMAGE-ID', async(event, entityID, entityType) => {
    let e = ENTITY_MANAGER.getEntity(entityType, entityID);
    try {
      e.imageID = '';
      e.hasImage = false;
      ENTITY_MANAGER.saveEntity(entityID, e);
    } catch(err) {
      console.log(err);
      return false;
    }
    return true;
  })

  ipcMain.handle('DELETE-ENTITY', async(event, uuid, entityType) => {
    try {
      if(ENTITY_MANAGER.deleteEntity(uuid, entityType) === true) {
        return true;
      } else {
        return false;
      }
    } catch(err) {
      console.log(err);
      return false;
    }
    return false;
  })
}
