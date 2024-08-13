import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { AngularElectronInterfaceService } from '../../services/angular-electron-interface.service';
import { RATING_KNOB_COLORS } from '../../constants/rating-knob-colors';
import { NavigationService } from '../../services/navigation.service';
import { MasterDataManagementService } from '../../services/master-data-management.service';

@Component({
  selector: 'app-entity-card',
  templateUrl: './entity-card.component.html',
  styleUrl: './entity-card.component.scss',
})
export class EntityCardComponent implements OnInit, OnChanges {
  @Input('entity') entity!: any;
  @Input('displaySortOption') displaySortOption!: any;
  @Input('sortOption') sortOption!: any;
  @Input('dialogEnabled') dialogEnabled!: boolean;
  @Output('onEditEntityClick') onEditEntityClicked = new EventEmitter<boolean>();
  loadingImage: boolean = true;
  fullImagePath: string | undefined;

  dialogVisible: boolean = false;

  userRatingColors: any = RATING_KNOB_COLORS;
  userRatingSelectedColor: string = this.userRatingColors['0']

  constructor(
    private angularElectron: AngularElectronInterfaceService,
    private masterDataManagement: MasterDataManagementService,
    private navigationService: NavigationService
  ){}

  ngOnInit(): void {
    this.renderImage();
    this.setUserRatingKnobColor();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.entity) {
      this.renderImage();
      this.setUserRatingKnobColor();
    }
  }

  showDialog(): void {
    if(this.dialogEnabled) this.dialogVisible = true;
  }

  editEntityClick(): void {
    this.dialogVisible = false;
    this.onEditEntityClicked.emit(true);
  }

  private renderImage(): void {
    let baseImagePath = this.angularElectron.getElectronImagePath();
    this.fullImagePath = `${baseImagePath}\\${this.entity.entityType}\\${this.entity.imageID}.png`
  }

  private setUserRatingKnobColor(): void {
    let colorKey = (Math.floor(this.entity['_userRating'] / 10) * 10).toString();
    this.userRatingSelectedColor = this.userRatingColors[colorKey];
  }
}
