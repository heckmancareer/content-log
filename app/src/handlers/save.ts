import {app, BrowserWindow, ipcMain, screen, dialog} from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import { ENTITY_MANAGER } from '../storage/entity-store';

export function registerAllIpcSaveFunctions() {

  ipcMain.handle('SAVE-ENTITY', async(event, uuid, entity) => {
    ENTITY_MANAGER.saveEntity(uuid, entity);
    return true;
  })

}
