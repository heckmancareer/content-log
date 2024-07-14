import { Component, Input, OnInit } from '@angular/core';
import { AngularElectronInterfaceService } from '../../services/angular-electron-interface.service';

@Component({
  selector: 'app-entity-card',
  templateUrl: './entity-card.component.html',
  styleUrl: './entity-card.component.scss'
})
export class EntityCardComponent implements OnInit {
  @Input('entity') entity!: any;
  loadingImage: boolean = true;
  fullImagePath: string | undefined;

  constructor(private angularElectron: AngularElectronInterfaceService){}

  ngOnInit(): void {
    let baseImagePath = this.angularElectron.getElectronImagePath();
    this.fullImagePath = `${baseImagePath}\\${this.entity.entityType}\\${this.entity.imageID}.png`
    this.loadingImage = false;
  }
}
