import { BasicEntity } from "../../../shared/models/basic-entity";
import { EntityType } from "../../../shared/models/entity-type";

export class BookEntity extends BasicEntity {

  get publicationYear(): number {
    return this.releaseDate.getFullYear();
  }

  set publicationYear(year: number) {
    const date = new Date();
    date.setFullYear(year);
    this.releaseDate = date;
  }

  author: string = '';
  pageCount: number = 1;
  entityType: EntityType = EntityType.Book;

  constructor() {
    super();
  }

  static fromPlainObject(obj: any): BookEntity {
    const instance = new BookEntity();
    for(const key of Object.keys(obj)) {
      if(instance.hasOwnProperty(key)) {
        (instance as any)[key] = obj[key];
      }
    }
    return instance;
  }
}
