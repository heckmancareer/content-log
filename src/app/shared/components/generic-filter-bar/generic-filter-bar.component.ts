import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EntityType } from '../../models/entity-type';
import { EntityFilterCriteria } from '../../helpers/entity-filter-criteria';

@Component({
  selector: 'app-generic-filter-bar',
  templateUrl: './generic-filter-bar.component.html',
  styleUrl: './generic-filter-bar.component.scss'
})
export class GenericFilterBarComponent {
  @Input('currentEntityType') currentEntityType!: EntityType;
  @Input('filterGenres') filterGenres!: string[];
  @Input('filterTags') filterTags!: string[];
  @Output('onFilterApply') onFilterApply = new EventEmitter<EntityFilterCriteria>();
  @Output('onFilterReset') onFilterReset = new EventEmitter<boolean>();

  filterCriteria: EntityFilterCriteria = new EntityFilterCriteria();

  emitFilterEvent() {
    this.onFilterApply.emit(this.filterCriteria);
  }

  emitFilterResetEvent() {
    this.filterCriteria = new EntityFilterCriteria();
    this.onFilterReset.emit(true);
  }
}
