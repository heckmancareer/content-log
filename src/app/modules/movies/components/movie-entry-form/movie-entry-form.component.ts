import { Component, OnInit } from '@angular/core';
import { MovieEntity } from '../../models/movie-entity';
import { StatusLoggerService } from '../../../../shared/services/status-logger.service';
import { InputNumberInputEvent } from 'primeng/inputnumber';
import { CategoriesManagementService } from '../../../../shared/services/categories-management.service';

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
  genresAutoCompleteItems: any[] | undefined; // All available tags
  genresAutoCompleteSuggestedItems: any[] = []; // Tags that match the current input
  genresAutoCompleteSelectedItems: any[] | undefined; // Tags that have been selected
  tagsAutoCompleteItems: any[] | undefined;
  tagsAutoCompleteSuggestedItems: any[] = [];
  tagsAutoCompleteSelectedItems: any[] | undefined;

  DUMMY_GENRES = ['horror', 'comedy', 'fiction', 'fantasy', 'ur-mom'];
  DUMMY_TAGS = ['one', 'two', 'three', 'four', 'five'];

  constructor(
    private statusLoggerService: StatusLoggerService,
    private categoriesManagmenetService: CategoriesManagementService){}

  ngOnInit(): void {
    this.movie.title = 'New Movie';
    this.setUserRatingKnobColor(this.movie.userRating);
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
}
