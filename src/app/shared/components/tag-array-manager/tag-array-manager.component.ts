import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-tag-array-manager',
  templateUrl: './tag-array-manager.component.html',
  styleUrl: './tag-array-manager.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TagArrayManagerComponent),
      multi: true,
    }
  ]
})
export class TagArrayManagerComponent implements ControlValueAccessor {
  @Output() onNewTagAdded = new EventEmitter<string>();
  @Input() typeLabel: string = '';
  @Input() availableTags: string[] = [];

  private _selectedTags: string[] = [];
}
