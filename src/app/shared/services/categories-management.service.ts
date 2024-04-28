import { Injectable, OnInit } from '@angular/core';
import { EntityType } from '../models/entity-type';
import { MasterDataManagementService } from './master-data-management.service';
import { BehaviorSubject } from 'rxjs';

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

  private areCategoriesDataLoaded: boolean = false;
  private readinessSource = new BehaviorSubject<boolean>(false);
  public categoriesReadiness = this.readinessSource.asObservable();


  constructor(private masterDataManagementService: MasterDataManagementService) { }

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

  areCategoriesReady(): boolean {
    return this.areCategoriesDataLoaded;
  }

  getAllGenres(entityType: EntityType): string[] {
    return [...this.entityTypeToGenreSet(entityType)];
  }

  getAllTags(entityType: EntityType): string[] {
    return [...this.entityTypeToTagSet(entityType)];
  }

  addTags(entityType: EntityType, ...tagsToAdd: string[]): void {
    for(let i = 0; i < tagsToAdd.length; i++) {
      this.entityTypeToTagSet(entityType).add(tagsToAdd[i]);
    }
  }

  addGenres(entityType: EntityType, ...genresToAdd: string[]): void {
    for(let i = 0; i < genresToAdd.length; i++) {
      this.entityTypeToGenreSet(entityType).add(genresToAdd[i]);
    }
  }

  /**
   * Retrieves an Entity Set from Master Data Management service to
   * extract all of their relevant tags or genres to store.
   * @param entityType Entity Type enumeration to denote which entities to parse.
   * @param v String equal to 'genres' or 'tags' to denote which Set to store
   * the values in.
   */
  extractCategoriesFromEntitySet(entityType: EntityType, v: 'genres' | 'tags'): Set<string> {
    let entitySet = this.masterDataManagementService.getEntitySetReference(entityType);
    let returnedValues = new Set<string>();
    for(const entity in entitySet) {
      entitySet[entity][v].forEach((value: string) => {
        returnedValues.add(value);
      })
    }
    return returnedValues;
  }

  /**
   * Function to be called early in the application's lifecycle, after the entity
   * data has been loaded into Master Data Management service, to get all of the
   * tags and genres for all entity types.
   */
  async loadInAllGenresAndTags(): Promise<void> {
    this.readinessSource.next(false);
    let entityTypes = Object.values(EntityType);
    for(const eType of entityTypes) {
      this.addGenres(eType, ...this.extractCategoriesFromEntitySet(eType, 'genres'));
      this.addTags(eType, ...this.extractCategoriesFromEntitySet(eType, 'tags'));
    }
    this.areCategoriesDataLoaded = true;
    this.readinessSource.next(true);
    return;
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
