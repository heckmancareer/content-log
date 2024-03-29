export abstract class BasicEntity {
  title: string = '';
  releaseDate: Date = new Date();
  releaseYear: number = this.releaseDate.getUTCFullYear();
  genres: string[] = [];
  tags: string[] = [];
  gridImageIdentifier: string = '';
  userDateCompleted: Date = new Date();
  userReview: string = '';
  userFavorited: boolean = false;
  imageID: string = '';

  _userRating: number = 0;
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
}
