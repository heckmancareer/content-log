
/**
 * Class that gets emitted by the 'GenericFilterBar Component' to evaluate
 * if a given entity matches all of the user-inputted filters.
 */
export class EntityFilterCriteria {
  title: string | null = null;
  fromReleaseDate: Date | null = null;
  toReleaseDate: Date | null = null;
  fromCompletionDate: Date | null = null;
  toCompletionDate: Date | null = null;
  genres: string[] = [];
  tags: string[] = [];

  movieWriter: string | null = null;
  movieDirector: string | null = null;

  evaluateEntity(entity: any): boolean {
    // Check title substring match
    if (this.title && (!entity.title || !entity.title.toLowerCase().includes(this.title.toLowerCase()))) {
      return false;
    }

    // Check release date range
    if (this.fromReleaseDate && (!entity.releaseDate || new Date(entity.releaseDate) < this.fromReleaseDate)) {
      return false;
    }

    if (this.toReleaseDate && (!entity.releaseDate || new Date(entity.releaseDate) > this.toReleaseDate)) {
      return false;
    }

    // Check completion date range
    if (this.fromCompletionDate && (!entity.completionDate || new Date(entity.completionDate) < this.fromCompletionDate)) {
      return false;
    }

    if (this.toCompletionDate && (!entity.completionDate || new Date(entity.completionDate) > this.toCompletionDate)) {
      return false;
    }

    // Check if genres match (every genre in criteria must be present in the entity)
    if (this.genres.length > 0 && (!entity.genres || !this.genres.every(genre => entity.genres.includes(genre)))) {
      return false;
    }

    // Check if tags match (every tag in criteria must be present in the entity)
    if (this.tags.length > 0 && (!entity.tags || !this.tags.every(tag => entity.tags.includes(tag)))) {
      return false;
    }

    // Check movie writer substring match
    if (this.movieWriter && (!entity.writer || !entity.writer.toLowerCase().includes(this.movieWriter.toLowerCase()))) {
      return false;
    }

    // Check movie director substring match
    if (this.movieDirector && (!entity.director || !entity.director.toLowerCase().includes(this.movieDirector.toLowerCase()))) {
      return false;
    }

    // If all checks pass, return true
    return true;
  }
}
