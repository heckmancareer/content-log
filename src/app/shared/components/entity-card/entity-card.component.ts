import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { AngularElectronInterfaceService } from '../../services/angular-electron-interface.service';
import { RATING_KNOB_COLORS } from '../../constants/rating-knob-colors';

@Component({
  selector: 'app-entity-card',
  templateUrl: './entity-card.component.html',
  styleUrl: './entity-card.component.scss',
})
export class EntityCardComponent implements OnInit, OnChanges {
  @Input('entity') entity!: any;
  @Input('displaySortOption') displaySortOption!: any;
  @Input('sortOption') sortOption!: any;
  loadingImage: boolean = true;
  fullImagePath: string | undefined;

  userRatingColors: any = RATING_KNOB_COLORS;
  userRatingSelectedColor: string = this.userRatingColors['0']

  constructor(private angularElectron: AngularElectronInterfaceService){}

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

  private renderImage(): void {
    let baseImagePath = this.angularElectron.getElectronImagePath();
    this.fullImagePath = `${baseImagePath}\\${this.entity.entityType}\\${this.entity.imageID}.png`
  }

  private setUserRatingKnobColor(): void {
    let colorKey = (Math.floor(this.entity['_userRating'] / 10) * 10).toString();
    this.userRatingSelectedColor = this.userRatingColors[colorKey];
  }
}
