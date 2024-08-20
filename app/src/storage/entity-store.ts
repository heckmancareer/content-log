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
  }

  public getEntity(uuid: string): any {
    return this.store.get(uuid);
  }

  public getAllEntities(): any {
    return this.store.store;
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

  private entityTypeToStore(entityType: string): EntityStore | undefined {
    switch(entityType) {
      case('movie'):
        return this.movieStore;
      case('video-game'):
        return this.videoGameStore;
      case('tv-show'):
        return this.tvShowStore;
      case('book'):
        return this.bookStore;
    }
    return undefined;
  }

  public saveEntity(uuid: string, entity: any): void {
    let targetStore = this.entityTypeToStore(entity.entityType);
    targetStore?.saveEntity(uuid, entity);
  }

  public getEntity(entityType: string, uuid: string): any {
    let targetStore = this.entityTypeToStore(entityType);
    return targetStore?.getEntity(uuid);
  }

  public getEntitiesOfType(entityType: string): any {
    let targetStore = this.entityTypeToStore(entityType);
    return targetStore?.getAllEntities();
  }
}

export const ENTITY_MANAGER = new EntityStoreManager();
