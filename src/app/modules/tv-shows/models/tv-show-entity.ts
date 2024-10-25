import { BasicEntity } from "../../../shared/models/basic-entity";
import { EntityType } from "../../../shared/models/entity-type";

export class TVShowEntity extends BasicEntity {

  seasonNumber: number = 1;
  episodeCount: number = 1;
  conclusionDate: Date = new Date();
  entityType: EntityType = EntityType.TVShow;

  constructor () {
    super();
  }

  static fromPlainObject(obj: any): TVShowEntity {
    const instance = new TVShowEntity();
    for(const key of Object.keys(obj)) {
      if(instance.hasOwnProperty(key)) {
        (instance as any)[key] = obj[key];
      }
    }
    return instance;
  }
}
