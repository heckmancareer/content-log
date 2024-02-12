import { Duration } from 'luxon';

class MovieEntity extends BasicEntity {
  runtime: Duration | undefined = undefined;
  director: string = '';
  writer: string = '';
}
