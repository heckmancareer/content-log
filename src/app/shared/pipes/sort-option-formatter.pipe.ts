import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortOptionFormatter',
  standalone: true
})
export class SortOptionFormatterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
