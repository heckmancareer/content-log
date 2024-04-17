import {app, BrowserWindow, ipcMain, screen, dialog} from 'electron';
import * as path from 'path';
import * as fs from 'fs';

ipcMain.handle('SAVE-ENTITY', async(event, uuid, entity) => {
  console.log('Entity received for saving!');
  console.log(uuid);
  console.log(event);
  console.log(entity);
  return true;
})
