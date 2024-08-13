import { Component, OnInit, Output } from '@angular/core';
import { MovieEntity } from '../../models/movie-entity';
import { StatusLoggerService } from '../../../../shared/services/status-logger.service';
import { InputNumberInputEvent } from 'primeng/inputnumber';
import { CategoriesManagementService } from '../../../../shared/services/categories-management.service';
import { AngularElectronInterfaceService } from '../../../../shared/services/angular-electron-interface.service';
import { EDITOR_OPTIONS } from './quill-editor-config';
import { EntityEditingService } from '../../../../shared/services/entity-editing.service';
import { EntityType } from '../../../../shared/models/entity-type';
import { NavigationService } from '../../../../shared/services/navigation.service';
import { RATING_KNOB_COLORS } from '../../../../shared/constants/rating-knob-colors';

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

  userRatingColorRanges: any = RATING_KNOB_COLORS
  userRatingKnobColor: string = this.userRatingColorRanges['0'];
  editorOptions: any = EDITOR_OPTIONS;

  genresAutoCompleteItems: string[]  = []; // All available tags
  genresAutoCompleteSuggestedItems: string[] = []; // Tags that match the current input
  genresNewItems: string[] = []; // User entered tags that aren't in the db

  tagsAutoCompleteItems: string[] = [];
  tagsAutoCompleteSuggestedItems: string[] = [];
  tagsNewItems: string[] = [];

  imageUrl: string = '';
  newSubmittedImageBuffer: Buffer | undefined;

  formSubmitted: boolean = false;
  tabViewActiveIndex: number = 0;

  constructor(
    private statusLoggerService: StatusLoggerService,
    private categoriesManagmenetService: CategoriesManagementService,
    private entityEditingService: EntityEditingService,
    private navigationService: NavigationService,
  ){}

  ngOnInit(): void {
    this.movie.title = 'New Movie';
    this.setUserRatingKnobColor(this.movie.userRating);
    this.genresAutoCompleteItems = [...this.categoriesManagmenetService.getAllGenres(EntityType.Movie)];
    this.genresAutoCompleteSuggestedItems = [...this.categoriesManagmenetService.getAllGenres(EntityType.Movie)];
    this.tagsAutoCompleteItems = [...this.categoriesManagmenetService.getAllTags(EntityType.Movie)];
    this.tagsAutoCompleteSuggestedItems = [...this.categoriesManagmenetService.getAllTags(EntityType.Movie)];

    if(this.entityEditingService.hasCurrentEntity()) {
      // This is a pre-existing entity
      this.movie = this.entityEditingService.getCurrentEntity();
      this.movieUUID = this.entityEditingService.getCurrentEntityUUID() as string;
      this.setUserRatingKnobColor(this.movie.userRating);

      this.movie.releaseDate = new Date(this.movie.releaseDate);
      if(this.movie.userDateCompleted) {
        this.movie.userDateCompleted = new Date(this.movie.userDateCompleted);
      }
      if(this.movie.hasImage) {
        this.imageUrl = this.entityEditingService.getCurrentEntityFullImagePath();
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

  setNewSubmittedImageBuffer($event: Buffer): void {
    this.newSubmittedImageBuffer = $event;
    this.movie.hasImage = true;
    this.imageUrl = '';
  }

  imageDeletionHandler($event: boolean): void {
    this.movie.hasImage = false;
    this.imageUrl = '';
  }

  onSubmit(movieForm: unknown): void {
    this.formSubmitted = true;
    this.categoriesManagmenetService.addGenres(EntityType.Movie, ...this.genresNewItems);
    this.categoriesManagmenetService.addTags(EntityType.Movie, ...this.tagsNewItems);
    if(this.newSubmittedImageBuffer) this.movie.hasImage = true;
    this.movie.userDateLastEdited = new Date();
    this.movie.userDateStarted = this.movie.userDateCompleted;

    this.entityEditingService.submitEntityForSaving(this.movieUUID, this.movie).then((result: boolean) => {
      if(result === true && this.newSubmittedImageBuffer) {
        this.entityEditingService.submitImageBufferForSaving
          (this.newSubmittedImageBuffer, EntityType.Movie, this.movie.imageID);
      }
      if(result === true) {
        this.statusLoggerService.logMessageToConsole(
          `Saved movie successfully.`,
          true,
          undefined,
          "success",
          this.movie
        )
        this.navigationService.enableIgnore();
        this.navigationService.navigateToPreviousPage();
      }
    });
  }

  onCancel(): void {
    this.navigationService.navigateToPreviousPage();
  }
}
