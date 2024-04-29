import {app, BrowserWindow, ipcMain, screen, dialog} from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import { ENTITY_MANAGER } from '../storage/entity-store';
import { v4 as uuidv4 } from 'uuid';

export function registerAllIpcGetFunctions() {

  ipcMain.handle('GET-ALL-ENTITIES-OF-TYPE', async (event, entityType) => {
    return ENTITY_MANAGER.getEntitiesOfType(entityType);
  })

  ipcMain.handle('GET-ENTITY-UUID', async(event) => {
    return uuidv4();
  })
}
