import { Duration } from 'luxon';
import { BasicEntity } from '../../../shared/models/basic-entity';
import { EntityType } from '../../../shared/models/entity-type';

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
  entityType: EntityType = EntityType.Movie;
}
