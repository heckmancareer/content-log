import { Injectable } from '@angular/core';

/**
 * This service is responsible for retrieving and holding all of the
 * potential tags and genres entities use. Asynchronously retrieves
 * this data from the db on application start.
 */
@Injectable({
  providedIn: 'root'
})
export class CategoriesManagementService {

  constructor() { }

  test() {
    const testString = `Example String! With Numbers 1234 and Symbols #$%!`;
    console.log(this.formatStringToTag(testString));
  }

  /**
   * Formats a string into a 'tag' entity. The properties of a tag are:
   * 1. All lower case characters
   * 2. No spaces
   * 3. Only alphabetical characters
   * 4. No longer than 25 characters
   * @param s String to be converted into tag format.
   * @returns Newly formatted tag.
   */
  formatStringToTag(s: string): string {
    return s.toLowerCase().replace(/ /g, '-').replace(/[^a-z]/g, '').substring(0, 25);
  }
}
