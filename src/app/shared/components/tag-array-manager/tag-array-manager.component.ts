import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AutoCompleteCompleteEvent, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { CategoriesManagementService } from '../../services/categories-management.service';
import { StatusLoggerService } from '../../services/status-logger.service';

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
  @Output() onNewTagCreated = new EventEmitter<string>();
  @Input() typeLabel: string = '';
  @Input() availableTags: string[] = [];
  @Input() staticInventoryHeight: number = 300;
  @Input() showTooltip: boolean = true;
  suggestedTags: string[] = [];
  placeholderSentence: string = `Press 'Enter' or ',' to enter a new tag.`
  tooltipSentence: string = `Entered values will be formatted to replace spaces with '-', remove all non-alphabetical characters, and have a max length of 25 characters.`

  constructor(
    private categoriesManagementService: CategoriesManagementService,
    private statusLoggerService: StatusLoggerService){}

  search($event: AutoCompleteCompleteEvent): void {
    this.suggestedTags = this.availableTags.filter(item => {
      return item.includes($event.query) && !this._selectedTags.has(item);
    })
  }

  select($event: AutoCompleteSelectEvent): void {
    this.updateValue($event.value);
  }

  checkKeyUp($event: KeyboardEvent): void {
    if($event.code === 'Comma' || $event.code === 'Enter') {
      let enteredTag = ($event.target as any).value;
      let sanitizedTag = this.categoriesManagementService.formatStringToTag(enteredTag);
      if(enteredTag !== sanitizedTag) {
        this.statusLoggerService.logStatusToToast(
          'warn',
          'Tag Formatted',
          `Tag was formatted to '${sanitizedTag}'`);
      }
      ($event.target as any).value = '';
      this.updateValue(sanitizedTag);
    }
  }

  removeChip($event: MouseEvent, tagToRemove: string): void {
    console.log($event);
    console.log(`Received ${tagToRemove} to delete.`)
    if(this._selectedTags.has(tagToRemove)) {
      this._selectedTags.delete(tagToRemove);
      this.onChange(Array.from(this._selectedTags));
      this.onTouched();
      console.log(this._selectedTags);
    }
  }

  addRandomTag() {
    this._selectedTags.add('Random Tag')
  }

  get selectedTags(): string[] {
    return [...this._selectedTags];
  }

  /**
   * INTERFACE IMPLEMENTATION
   * Values implemented for the ControlValueAccessor interface.
   */
  private _selectedTags: Set<string> = new Set<string>(['tag', 'tagg', 'taggg', 'taggggg']);

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    console.log('writeValue called');
    if(value !== undefined && value !== null && Array.isArray(value)) {
      this._selectedTags = new Set(value);
    }
  }

  updateValue(newValue: string): void {
    console.log('updateValue called.');
    this._selectedTags.add(newValue);
    if(this.availableTags.indexOf(newValue) === -1) {
      this.onNewTagCreated.emit(newValue);
    }

    this.onChange(Array.from(this._selectedTags));
    this.onTouched();
    console.log(this._selectedTags);
  }

  registerOnChange(fn: any): void {
    console.log('registerOnChange called.');
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    console.log('registerOnTouched called.');
    this.onTouched = fn;
  }
}
