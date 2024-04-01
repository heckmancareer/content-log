import { Injectable, OnInit } from '@angular/core';

/**
 * This service is responsible for retrieving and holding all of the
 * potential tags and genres entities use. Asynchronously retrieves
 * this data from the db on application start.
 */
@Injectable({
  providedIn: 'root'
})
export class CategoriesManagementService implements OnInit {
  genres: Set<string> = new Set<string>(['horror', 'comedy', 'fiction', 'fantasy', 'ur-mom']);
  tags: Set<string> = new Set<string>(['one', 'two', 'three', 'four', 'five']);


  constructor() { }

  ngOnInit(): void {}

  getAllGenres(): string[] {
    return [...this.genres];
  }

  getAllTags(): string[] {
    return [...this.tags];
  }

  addTags(...tagsToAdd: string[]): void {
    for(const tag in tagsToAdd) this.tags.add(tag);
  }

  addGenres(...genresToAdd: string[]): void {
    for(const genre in genresToAdd) this.genres.add(genre);
  }

  /**
   * Formats a string into a 'tag' entity. The properties of a tag are:
   * 1. All lower case characters
   * 2. No spaces
   * 3. Only alphabetical characters and hyphens
   * 4. No longer than 25 characters
   * @param s String to be converted into tag format.
   * @returns Newly formatted tag.
   */
  formatStringToTag(s: string): string {
    return s.toLowerCase().trim().replace(/ /g, '-').replace(/[^a-z-]/g, '').substring(0, 25);
  }
}
