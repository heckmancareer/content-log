import { BasicEntity } from './basic-entity';
import { EntityType } from './entity-type';

export class MovieEntity extends BasicEntity {
  _runtimeInMinutes: number = 0;
  get runtime(): number {
    return this._runtimeInMinutes;
  }
  set runtime(minutes: number) {
    this._runtimeInMinutes = minutes;
  }

  director: string = '';
  writer: string = '';
  plotSummary: string = '';
  entityType: EntityType = EntityType.Movie;
}
