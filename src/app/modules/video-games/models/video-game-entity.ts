import { BasicEntity } from "../../../shared/models/basic-entity";
import { EntityType } from "../../../shared/models/entity-type";

export class VideoGameEntity extends BasicEntity {


  developer: string = '';
  publisher: string = '';
  playtimeHours: number = 0;
  platform: string = '';
  entityType: EntityType = EntityType.VideoGame;

  constructor() {
    super();
  }

  static fromPlainObject(obj: any): VideoGameEntity {
    const instance = new VideoGameEntity();
    for(const key of Object.keys(obj)) {
      if(instance.hasOwnProperty(key)) {
        (instance as any)[key] = obj[key];
      }
    }
    return instance;
  }
}
