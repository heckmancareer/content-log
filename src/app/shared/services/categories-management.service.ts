import { Injectable, OnInit } from '@angular/core';
import { EntityType } from '../models/entity-type';

/**
 * This service is responsible for retrieving and holding all of the
 * potential tags and genres entities use. Asynchronously retrieves
 * this data from the db on application start.
 */
@Injectable({
  providedIn: 'root'
})
export class CategoriesManagementService implements OnInit {
  movieGenres: Set<string> = new Set<string>();
  movieTags: Set<string> = new Set<string>();
  tvShowGenres: Set<string> = new Set<string>();
  tvShowTags: Set<string> = new Set<string>();
  videoGameGenres: Set<string> = new Set<string>();
  videoGameTags: Set<string> = new Set<string>();
  bookGenres: Set<string> = new Set<string>();
  bookTags: Set<string> = new Set<string>();


  constructor() { }

  ngOnInit(): void {}

  private entityTypeToGenreSet(entityType: EntityType): Set<string> {
    switch(entityType) {
      case EntityType.Movie:
        return this.movieGenres;
      case EntityType.Book:
        return this.bookGenres;
      case EntityType.TVShow:
        return this.tvShowGenres;
      case EntityType.VideoGame:
        return this.videoGameGenres;
    }
  }

  private entityTypeToTagSet(entityType: EntityType): Set<string> {
    switch(entityType) {
      case EntityType.Movie:
        return this.movieTags;
      case EntityType.Book:
        return this.bookTags;
      case EntityType.TVShow:
        return this.tvShowTags;
      case EntityType.VideoGame:
        return this.videoGameTags;
    }
  }

  getAllGenres(entityType: EntityType): string[] {
    return [...this.entityTypeToGenreSet(entityType)];
  }

  getAllTags(entityType: EntityType): string[] {
    return [...this.entityTypeToTagSet(entityType)];
  }

  addTags(entityType: EntityType, ...tagsToAdd: string[]): void {
    for(const tag in tagsToAdd) this.entityTypeToGenreSet(entityType).add(tag);
  }

  addGenres(entityType: EntityType, ...genresToAdd: string[]): void {
    for(const genre in genresToAdd) this.entityTypeToTagSet(entityType).add(genre);
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
