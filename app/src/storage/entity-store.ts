import { app } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
const Store = require('electron-store');

/**
 * An object designed to be responsible for saving and retrieving data
 * for a single kind of entity.
 */
class EntityStore {
  private store: typeof Store;

  constructor(private entityType: string) {
    this.store = new Store({
      name: `${this.entityType}-data`
    });

  }

  public saveEntity(uuid: string, entity: any) {
    this.store.set(uuid, entity);
    console.log(`Saving entity ${uuid} in store ${this.entityType} was successful.`);
  }

  public getEntity(uuid: string): any {
    return this.store.get(uuid);
  }

  public getAllEntities(): any[] {
    return Object.values(this.store.store);
  }
}

/**
 * An object that is responsible for initializing, and maintaining all of the EntityStores
 * during runtime.
 */
class EntityStoreManager {
  private movieStore: EntityStore | undefined;
  private tvShowStore: EntityStore | undefined;
  private bookStore: EntityStore | undefined;
  private videoGameStore: EntityStore | undefined;

  constructor() {
    this.movieStore = new EntityStore('movie');
    this.tvShowStore = new EntityStore('tv-show');
    this.videoGameStore = new EntityStore('video-game');
    this.bookStore = new EntityStore('book');
  }

  public saveEntity(uuid: string, entity: any) {
    console.log(entity)
    switch(entity.entityType) {
      case 'movie':
        this.movieStore?.saveEntity(uuid, entity);
      case 'tv-show':
        this.tvShowStore?.saveEntity(uuid, entity);
      case 'video-game':
        this.videoGameStore?.saveEntity(uuid, entity);
      case 'book':
        this.bookStore?.saveEntity(uuid, entity);
    }
  }
}

export const ENTITY_MANAGER = new EntityStoreManager();
