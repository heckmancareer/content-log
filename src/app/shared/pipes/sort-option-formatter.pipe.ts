import { Pipe, PipeTransform } from '@angular/core';
import { EntityCompletionStatus } from '../models/basic-entity';

@Pipe({
  name: 'sortOptionFormatter',
  standalone: true
})
export class SortOptionFormatterPipe implements PipeTransform {

  /**
   *
   * @param value
   * @param args The first arg is expected to be a string identifier, specifying
   * what field is currently being formatted.
   * @returns
   */
  transform(value: unknown, ...args: unknown[]): unknown {
    if(value === undefined || value === null || value === '') return 'N/A'


    switch(args[0]) {
      case 'releaseDate' || 'userDateStarted' || 'userDateCompleted' || 'userDateAdded' || 'userDateLasteEdited':
        let date = new Date(value as  string);
        return this.formatDate(date);
        break;
      case 'completionStatus':
        return this.formatEnumString(value as string);
        break;
      case '_runtimeInMinutes':
        return `${value} minutes`
        break;
      case '_userRating' || 'releaseYear':
        return `${value}`
        break;
    }

    return value;
  }

  private formatDate(date: Date): string {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    const daySuffix = this.formatDateSuffix(day);

    return `${month} ${day}${daySuffix}, ${year}`;
  }

  private formatDateSuffix(day: number): string {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }

  private formatEnumString(enumString: string): string {
    return enumString
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

}
