import { Injectable } from '@angular/core';
import { MovieEntity } from '../../modules/movies/models/movie-entity';

/**
 * This service is responsible for holding all data about all content
 * entries in memory for user browsing, viewing, and editing.
 */
@Injectable({
  providedIn: 'root'
})
export class MasterDataManagementService {
  private movieMasterSet: Record<string, MovieEntity> = {};

  constructor() { }
}
