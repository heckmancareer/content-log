abstract class BasicEntity {
  title: string = '';
  releaseDate: Date = new Date();
  releaseYear: number = this.releaseDate.getUTCFullYear();
  genres: string[] = [];
  keywords: string[] = [];

  userRating: number = 0;
  userDateCompleted: Date = new Date();
  userReview: string = '';
  userFavorited: boolean = false;
}
