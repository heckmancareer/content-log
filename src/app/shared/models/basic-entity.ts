import { EntityType } from "./entity-type";

export abstract class BasicEntity {
  abstract entityType: EntityType;

  private _userRating: number = 0;
  get userRating() {
    return this._userRating;
  }
  set userRating(value: number) {
    if(value < 0) {
      this._userRating = 0;
      console.error('Validation error. Attempted to set userRating to less than 0');
    } else if (value > 100) {
      this._userRating = 100;
      console.error('Validation error. Attempted to set userRating to greater than 100');
    } else {
      this._userRating = value;
    }
  }

  title: string = '';
  plotSummary: string = '';
  releaseDate: Date = new Date();
  genres: string[] = [];
  tags: [] = [];
  userDateStarted: Date | null = null;
  userDateCompleted: Date | null = null;
  userDateAdded: Date = new Date();
  userDateLastEdited: Date = new Date();
  completionStatus: EntityCompletionStatus = EntityCompletionStatus.NotStarted;
  userReview: string = '';
  userFavorited: boolean = false;
  imageID: string = '';
  hasImage: boolean = false;

  constructor() {
  }
}

export enum EntityCompletionStatus {
  NotStarted = 'not-started',
  InProgress = 'in-progress',
  Completed = 'completed'
}
