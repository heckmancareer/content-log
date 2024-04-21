import {app, BrowserWindow, ipcMain, screen, dialog} from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import { ENTITY_MANAGER } from '../storage/entity-store';

export function registerAllIpcGetFunctions() {


  ipcMain.handle('GET-ALL-ENTITIES-OF-TYPE', async (event, entityType) => {
    return ENTITY_MANAGER.getEntitiesOfType(entityType);
  })
}
