import { Component, OnInit } from '@angular/core';
import { MovieEntity } from '../../models/movie-entity';
import { StatusLoggerService } from '../../../../shared/services/status-logger.service';
import { InputNumberInputEvent } from 'primeng/inputnumber';
import { CategoriesManagementService } from '../../../../shared/services/categories-management.service';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { AngularElectronInterfaceService } from '../../../../shared/services/angular-electron-interface.service';

@Component({
  selector: 'app-movie-entry-form',
  templateUrl: './movie-entry-form.component.html',
  styleUrl: './movie-entry-form.component.scss'
})
export class MovieEntryFormComponent implements OnInit {
  // Main form object
  movie: MovieEntity = new MovieEntity();
  //

  userRatingColorRanges: any = {
    '0': '#FF0000',
    '10': '#FF0000',
    '20': '#FF4500',
    '30': '#FF8C00',
    '40': '#FFD700',
    '50': '#FFFF00',
    '60': '#BDB76B',
    '70': '#ADD8E6',
    '80': '#87CEEB',
    '90': '#90EE90',
    '100': '#008000',
  }
  userRatingKnobColor: string = this.userRatingColorRanges['0'];

  genresAutoCompleteItems: string[]  = []; // All available tags
  genresAutoCompleteSuggestedItems: string[] = []; // Tags that match the current input
  genresNewItems: string[] = []; // User entered tags that aren't in the db

  tagsAutoCompleteItems: string[] = [];
  tagsAutoCompleteSuggestedItems: string[] = [];
  tagsNewItems: string[] = [];

  imageUrl: string = '';

  formSubmitted: boolean = false;
  tabViewActiveIndex: number = 0;

  constructor(
    private statusLoggerService: StatusLoggerService,
    private categoriesManagmenetService: CategoriesManagementService,
    private angularElectronInterfaceService: AngularElectronInterfaceService){}

  ngOnInit(): void {
    this.movie.title = 'New Movie';
    this.setUserRatingKnobColor(this.movie.userRating);
    this.genresAutoCompleteItems = [...this.categoriesManagmenetService.getAllGenres()];
    this.genresAutoCompleteSuggestedItems = [...this.categoriesManagmenetService.getAllGenres()];
    this.tagsAutoCompleteItems = [...this.categoriesManagmenetService.getAllTags()];
    this.tagsAutoCompleteSuggestedItems = [...this.categoriesManagmenetService.getAllTags()];
  }

  filterGenresForAutoComplete($event: AutoCompleteCompleteEvent) {
    this.genresAutoCompleteSuggestedItems = this.genresAutoCompleteItems.filter(item => {
      return item.includes($event.query) && !this.movie.genres.includes(item);
    })
  }

  /**
   * When the user is entering in a new tag, and they press space, it should
   * be checked to see if the tag entered matches any of the pre-existing tags.
   * If it does, add that tag. If it doesn't, add that value as a new tag.
   * @param event
   */
  genresAddItemOnKeyUp($event: KeyboardEvent) {
    if($event.code === 'Space') {
      let enteredTag = ($event.target as any).value.slice(0, -1);
      let sanitizedTag = this.categoriesManagmenetService.formatStringToTag(enteredTag);
      ($event.target as any).value = '';

      /**
       * If the entered tag is already selected, do nothing.
       * If it's not selected, but in the list of master items, select it.
       * If it's not selected, and it's not in the list of master items,
       * select it, and add it to the new genres array.
       */
      if(!this.movie.genres.includes(sanitizedTag)) {
        if(!this.genresAutoCompleteItems.includes(sanitizedTag)) {
          this.genresNewItems.push(sanitizedTag);
        }
        this.movie.genres.push(sanitizedTag);
      }
    }
  }

  filterTagsForAutoComplete($event: AutoCompleteCompleteEvent) {
    this.tagsAutoCompleteSuggestedItems = this.tagsAutoCompleteItems.filter(item => {
      return item.includes($event.query) && !this.movie.tags.includes(item);
    })
  }

  tagsAddItemOnKeyUp($event: KeyboardEvent) {
    if($event.code === 'Space') {
      let enteredTag = ($event.target as any).value.slice(0, -1);
      let sanitizedTag = this.categoriesManagmenetService.formatStringToTag(enteredTag);
      ($event.target as any).value = '';

      if(!this.movie.tags.includes(sanitizedTag)) {
        if(!this.tagsAutoCompleteItems.includes(sanitizedTag)) {
          this.tagsNewItems.push(sanitizedTag);
        }
        this.movie.tags.push(sanitizedTag);
      }
    }
  }

  /**
   * Sets the user rating knob's color using either a 'number'
   * or 'InputNumberInputEvent' object.
   * @param $event The object to determine the color.
   */
  setUserRatingKnobColor($event: unknown): void {
    let targetValue = 0;

    if(($event as InputNumberInputEvent).value !== undefined) {
      targetValue = Number.parseInt(($event as InputNumberInputEvent).value);
    } else {
      targetValue = ($event as number);
    }
    let colorKey = (Math.floor(targetValue / 10) * 10).toString();

    this.userRatingKnobColor = this.userRatingColorRanges[colorKey];
  }

  onSubmit(movieForm: unknown): void {
    this.formSubmitted = true;

    this.categoriesManagmenetService.addGenres(...this.genresNewItems);
    this.categoriesManagmenetService.addTags(...this.tagsNewItems);
  }
}
