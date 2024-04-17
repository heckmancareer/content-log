import { Component, OnInit } from '@angular/core';
import { MovieEntity } from '../../models/movie-entity';
import { StatusLoggerService } from '../../../../shared/services/status-logger.service';
import { InputNumberInputEvent } from 'primeng/inputnumber';
import { CategoriesManagementService } from '../../../../shared/services/categories-management.service';
import { AngularElectronInterfaceService } from '../../../../shared/services/angular-electron-interface.service';
import { EDITOR_OPTIONS } from './quill-editor-config';
import { EntityEditingService } from '../../../../shared/services/entity-editing.service';

@Component({
  selector: 'app-movie-entry-form',
  templateUrl: './movie-entry-form.component.html',
  styleUrl: './movie-entry-form.component.scss'
})
export class MovieEntryFormComponent implements OnInit {
  // Main form object
  movie: MovieEntity = new MovieEntity();
  movieUUID: string = '';
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
  editorOptions: any = EDITOR_OPTIONS;

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
    private angularElectronInterfaceService: AngularElectronInterfaceService,
    private entityEditingService: EntityEditingService){}

  ngOnInit(): void {
    this.movie.title = 'New Movie';
    this.setUserRatingKnobColor(this.movie.userRating);
    this.genresAutoCompleteItems = [...this.categoriesManagmenetService.getAllGenres()];
    this.genresAutoCompleteSuggestedItems = [...this.categoriesManagmenetService.getAllGenres()];
    this.tagsAutoCompleteItems = [...this.categoriesManagmenetService.getAllTags()];
    this.tagsAutoCompleteSuggestedItems = [...this.categoriesManagmenetService.getAllTags()];
    this.movie.genres = new Set(['test', 'testt', 'testtt']);
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

    this.entityEditingService.submitEntityForSaving(this.movieUUID, this.movie);
  }
}
