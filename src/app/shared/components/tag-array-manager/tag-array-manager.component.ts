import { Component, Input, Output, EventEmitter, forwardRef, ViewChild, ElementRef } from '@angular/core';
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
  placeholderSentence: string = `Press 'Enter' or ',' to enter a new item.`
  tooltipSentence: string = `Entered values will be formatted to replace spaces with '-', remove all non-alphabetical characters, and have a max length of 25 characters.`

  constructor(
    private categoriesManagementService: CategoriesManagementService,
    private statusLoggerService: StatusLoggerService){}

  /**
   * Event handler for when text is entered into the search field. Returns
   * items that match the given query, AND haven't already been selected.
   * @param $event The event passed by the AutoComplete component.
   */
  search($event: AutoCompleteCompleteEvent): void {
    this.suggestedTags = this.availableTags.filter(item => {
      return item.includes($event.query) && !this._selectedTags.has(item);
    })
  }

  select($event: AutoCompleteSelectEvent): void {

  }

  /**
   * Event handler for when either a comma, or enter key, has been pressed,
   * to submit a tag to be added to the set.
   * @param $event
   */
  checkKeyUp($event: KeyboardEvent): void {
    if($event.code === 'Comma' || $event.code === 'Enter') {
      let enteredTag = ($event.target as any).value;
      let sanitizedTag = this.categoriesManagementService.formatStringToTag(enteredTag);
      if(this._selectedTags.has(sanitizedTag)) {
        this.statusLoggerService.logMessageToConsole(
          'Duplicate Tag Submitted',
          true,
          `Submitted item '${sanitizedTag}', which was already present in the form.`,
          'warn',
        );
        ($event.target as any).value = '';
        return;
      }
      if(enteredTag !== sanitizedTag) {
        this.statusLoggerService.logStatusToToast(
          'warn',
          'Item Formatted',
          `Item was formatted to '${sanitizedTag}'`);
      }
      ($event.target as any).value = '';
      this.updateValue(sanitizedTag);
    }
  }

  removeChip($event: MouseEvent, tagToRemove: string): void {
    if(this._selectedTags.has(tagToRemove)) {
      this._selectedTags.delete(tagToRemove);
      this.onChange(Array.from(this._selectedTags));
      this.onTouched();
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
  private _selectedTags: Set<string> = new Set<string>();

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    if(value !== undefined && value !== null && value instanceof Set) {
      this._selectedTags = new Set(value);
    }

  }

  updateValue(newValue: string): void {
    this._selectedTags.add(newValue);
    if(this.availableTags.indexOf(newValue) === -1) {
      this.onNewTagCreated.emit(newValue);
    }

    this.onChange(Array.from(this._selectedTags));
    this.onTouched();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
