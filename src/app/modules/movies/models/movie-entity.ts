import { Duration } from 'luxon';
import { BasicEntity } from '../../../shared/models/basic-entity';

export class MovieEntity extends BasicEntity {
  runtime: Duration | undefined = undefined;
  director: string = '';
  writer: string = '';
}
