import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { EntityType } from '../../models/entity-type';
import { EntityFilterCriteria } from '../../helpers/entity-filter-criteria';

@Component({
  selector: 'app-generic-filter-bar',
  templateUrl: './generic-filter-bar.component.html',
  styleUrl: './generic-filter-bar.component.scss'
})
export class GenericFilterBarComponent implements OnInit {
  @Input('currentEntityType') currentEntityType!: EntityType;
  @Input('filterGenres') filterGenres!: string[];
  @Input('filterTags') filterTags!: string[];
  @Output('onFilterApply') onFilterApply = new EventEmitter<EntityFilterCriteria>();
  @Output('onFilterReset') onFilterReset = new EventEmitter<boolean>();

  filterCriteria: EntityFilterCriteria = new EntityFilterCriteria();
  titleLabel: string = 'Movie Title';

  ngOnInit(): void {
    switch(this.currentEntityType) {
      case EntityType.Movie:
        this.titleLabel = 'Movie Title';
        break;
      case EntityType.TVShow:
        this.titleLabel = 'TV Show Title';
        break;
      case EntityType.Book:
        this.titleLabel = 'Book Title';
        break;
      case EntityType.VideoGame:
        this.titleLabel = 'Video Game Title';
        break;
    }
  }

  emitFilterEvent() {
    this.onFilterApply.emit(this.filterCriteria);
  }

  emitFilterResetEvent() {
    this.filterCriteria = new EntityFilterCriteria();
    this.onFilterReset.emit(true);
  }
}
