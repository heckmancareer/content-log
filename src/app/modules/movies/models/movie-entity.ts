import { Duration } from 'luxon';
import { BasicEntity } from '../../../shared/models/basic-entity';

export class MovieEntity extends BasicEntity {
  _runtime: Duration = Duration.fromObject({seconds: 0});
  get runtime(): number {
    return this._runtime.minutes;
  }
  set runtime(minutes: number) {
    this._runtime = Duration.fromObject({minutes: minutes});
  }

  director: string = '';
  writer: string = '';
  plotSummary: string = '';
}
