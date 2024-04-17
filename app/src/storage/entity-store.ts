import { app } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
const Store = require('electron-store');

class EntityStore {
  private store: typeof Store;

  constructor(private entityType: string) {
    this.store = new Store();
  }
}
