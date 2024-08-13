import { Component, Input, Output, EventEmitter, forwardRef, ViewChild, ElementRef, OnInit } from '@angular/core';
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
export class TagArrayManagerComponent implements OnInit {
  @Output() onNewTagCreated = new EventEmitter<string>();
  @Output() selectedTagsChange = new EventEmitter<Set<string>>();
  @Input() typeLabel: string = '';
  @Input() availableTags: string[] = [];
  @Input() staticInventoryHeight: number = 300;
  @Input() showTooltip: boolean = true;
  @Input() selectedTags!: Set<string>;
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
      return item.includes($event.query) && !this.selectedTags.has(item);
    })
  }

  select($event: AutoCompleteSelectEvent): void {

  }

  ngOnInit(): void {
    this.selectedTags = new Set<string>(this.selectedTags);
    this.selectedTagsChange.emit(this.selectedTags);
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
      if(this.selectedTags.has(sanitizedTag)) {
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
      this.selectedTags.add(enteredTag);
      this.selectedTagsChange.emit(this.selectedTags);
    }
  }

  removeChip($event: MouseEvent, tagToRemove: string): void {
    if(this.selectedTags.has(tagToRemove)) {
      this.selectedTags.delete(tagToRemove);
      this.selectedTagsChange.emit(this.selectedTags);
    }
  }
}
