import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { AngularElectronInterfaceService } from '../../services/angular-electron-interface.service';

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

  constructor(private angularElectron: AngularElectronInterfaceService){}

  ngOnInit(): void {
    this.renderImage();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.entity) {
      this.renderImage();
    }
  }

  private renderImage(): void {
    let baseImagePath = this.angularElectron.getElectronImagePath();
    this.fullImagePath = `${baseImagePath}\\${this.entity.entityType}\\${this.entity.imageID}.png`
  }
}
