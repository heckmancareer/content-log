import { Component, OnInit} from '@angular/core';
import { MovieEntity } from '../../../movies/models/movie-entity';
import { StatusLoggerService } from '../../../../shared/services/status-logger.service';
import { InputNumberInputEvent } from 'primeng/inputnumber';
import { CategoriesManagementService } from '../../../../shared/services/categories-management.service';
import { EDITOR_OPTIONS } from './quill-editor-config';
import { EntityEditingService } from '../../../../shared/services/entity-editing.service';
import { EntityType } from '../../../../shared/models/entity-type';
import { NavigationService } from '../../../../shared/services/navigation.service';
import { RATING_KNOB_COLORS } from '../../../../shared/constants/rating-knob-colors';
import { EntityCompletionStatus } from '../../../../shared/models/basic-entity';
import { ConfirmationDialogService } from '../../../../shared/services/confirmation-dialog.service';
import { TVShowEntity } from '../../models/tv-show-entity';

@Component({
  selector: 'app-tv-show-entry-form',
  templateUrl: './tv-show-entry-form.component.html',
  styleUrl: './tv-show-entry-form.component.scss'
})
export class TVShowEntryFormComponent implements OnInit {
  // Main form object
  tvShow: TVShowEntity = new TVShowEntity();
  tvShowUUID: string = '';
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
  deleteVisible: boolean = false;
  tabViewActiveIndex: number = 0;

  completedStatusOptions = [
    {label: 'Not Started', status: EntityCompletionStatus.NotStarted},
    {label: 'In Progress', status: EntityCompletionStatus.InProgress},
    {label: 'Completed', status: EntityCompletionStatus.Completed},
  ]

  constructor(
    private statusLoggerService: StatusLoggerService,
    private categoriesManagmenetService: CategoriesManagementService,
    private entityEditingService: EntityEditingService,
    private navigationService: NavigationService,
    private confirmationDialogueService: ConfirmationDialogService
  ){}

  ngOnInit(): void {
    this.tvShow.title = 'New Movie';
    this.setUserRatingKnobColor(this.tvShow.userRating);
    this.genresAutoCompleteItems = [...this.categoriesManagmenetService.getAllGenres(EntityType.TVShow)];
    this.genresAutoCompleteSuggestedItems = [...this.categoriesManagmenetService.getAllGenres(EntityType.TVShow)];
    this.tagsAutoCompleteItems = [...this.categoriesManagmenetService.getAllTags(EntityType.TVShow)];
    this.tagsAutoCompleteSuggestedItems = [...this.categoriesManagmenetService.getAllTags(EntityType.TVShow)];

    if(this.entityEditingService.hasCurrentEntity()) {
      // This is a pre-existing entity
      this.tvShow = this.entityEditingService.getCurrentEntity();
      this.tvShowUUID = this.entityEditingService.getCurrentEntityUUID() as string;
      this.setUserRatingKnobColor(this.tvShow.userRating);

      this.tvShow.conclusionDate = new Date(this.tvShow.conclusionDate);
      if(this.tvShow.userDateStarted) {
        this.tvShow.userDateStarted = new Date(this.tvShow.userDateStarted);
      }
      if(this.tvShow.userDateCompleted) {
        this.tvShow.userDateCompleted = new Date(this.tvShow.userDateCompleted);
      }
      if(this.tvShow.hasImage) {
        this.imageUrl = this.entityEditingService.getCurrentEntityFullImagePath();
      }
      this.deleteVisible = true;
    }
  }

  /**
   * Sets the user rating knob's color using either a 'number'
   * or 'InputNumberInputEvent' object.
   * @param $event The object to determine the color.
   */
  setUserRatingKnobColor($event: unknown): void {
    console.log(`setUserRatingKnobColor called.`);
    let targetValue = 0;

    if($event !== undefined && ($event as InputNumberInputEvent).value !== undefined) {
      targetValue = Number.parseInt(($event as any).value);
    } else {
      console.log(`Setting knob to: ${$event}`);
      targetValue = ($event as number);
    }
    let colorKey = (Math.floor(targetValue / 10) * 10).toString();

    this.userRatingKnobColor = this.userRatingColorRanges[colorKey];
  }

  setNewSubmittedImageBuffer($event: Buffer): void {
    this.newSubmittedImageBuffer = $event;
    this.tvShow.hasImage = true;
    this.imageUrl = '';
  }

  imageDeletionHandler($event: boolean): void {
    if(this.tvShow.hasImage && this.imageUrl !== '' && this.tvShowUUID !== '') {
      this.entityEditingService.submitImageIDForDeletion(this.tvShow.entityType, this.tvShow.imageID, this.tvShowUUID)
      .then((result: boolean) => {
        if(result === true) {
          this.tvShow.hasImage = false;
          this.imageUrl = '';
        }
      })
    }
    this.newSubmittedImageBuffer = undefined;
  }

  onSubmit(tvShowForm: unknown): void {
    this.formSubmitted = true;
    this.categoriesManagmenetService.addGenres(EntityType.TVShow, ...this.genresNewItems);
    this.categoriesManagmenetService.addTags(EntityType.TVShow, ...this.tagsNewItems);
    if(this.newSubmittedImageBuffer) this.tvShow.hasImage = true;
    this.tvShow.userDateLastEdited = new Date();

    this.entityEditingService.submitEntityForSaving(this.tvShowUUID, this.tvShow).then((result: boolean) => {
      if(result === true && this.newSubmittedImageBuffer) {
        this.entityEditingService.submitImageBufferForSaving
          (this.newSubmittedImageBuffer, EntityType.TVShow, this.tvShow.imageID);
      }
      if(result === true) {
        this.statusLoggerService.logMessageToConsole(
          `Saved movie successfully.`,
          true,
          undefined,
          "success",
          this.tvShow
        )
        this.navigationService.enableIgnore();
        this.navigationService.navigateToPreviousPage();
      }
    });
    console.log(this.tvShow);
  }

  onDeletion(): void {
    if(this.tvShowUUID === '' || this.deleteVisible === false) {
      console.log(`Entity does not exist on file system, unable to delete.`);
      return;
    }
    this.confirmationDialogueService.promptConfirmation(
      `WARNING: Are you sure you want to delete?`,
      `You are about to delete this entity, which will delete both it and any of its images from your file system. This cannot be undone. Are you sure you want to continue?`,
      true,
      'Delete',
    ).then((result: boolean) => {
      if(result === true) {
        this.entityEditingService.submitEntityForDeletion(this.tvShowUUID, this.tvShow).then((result: boolean) => {
          if(result === true) {
            this.statusLoggerService.logMessageToConsole(
              `Deleted movie successfully.`,
              true,
              undefined,
              "success",
            )
            this.navigationService.enableIgnore();
            this.navigationService.navigateToPreviousPage();
          }
        }).catch((error: any) => {
          console.log(error);
        })
      }
    })
  }

  testEvent($event: any) {
    console.log($event);
    console.log(this.tvShow);
  }

  onCancel(): void {
    this.navigationService.navigateToPreviousPage();
  }
}
