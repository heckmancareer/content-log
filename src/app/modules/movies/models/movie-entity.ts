import { BasicEntity } from '../../../shared/models/basic-entity';
import { EntityType } from '../../../shared/models/entity-type';

export class MovieEntity extends BasicEntity {
  private _runtimeInMinutes: number = 0;
  get runtime(): number {
    return this._runtimeInMinutes;
  }
  set runtime(minutes: number) {
    this._runtimeInMinutes = minutes;
  }

  director: string = '';
  writer: string = '';
  entityType: EntityType = EntityType.Movie;

  constructor() {
    super();
  }

  static fromPlainObject(obj: any): MovieEntity {
    const instance = new MovieEntity();
    for(const key of Object.keys(obj)) {
      if(instance.hasOwnProperty(key)) {
        (instance as any)[key] = obj[key];
      }
    }
    return instance;
  }
}
