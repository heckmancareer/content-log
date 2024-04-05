import { Injectable } from '@angular/core';
import { MasterDataManagementService } from './master-data-management.service';
import { AngularElectronInterfaceService } from './angular-electron-interface.service';

/**
 * This service is responsible for handling edits to entities
 * via forms, and saving them to the fs.
 */
@Injectable({
  providedIn: 'root'
})
export class EntityEditingService {

  constructor(
    private masterDataManagement: MasterDataManagementService,
    private angularElectronInterface: AngularElectronInterfaceService
  ) { }

  submitEntityForSaving(uuid: string, entity: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      // If UUID is blank, or does not exist in data, then it's a new entity.
      if(uuid === '' || !this.masterDataManagement.hasEntity(uuid, entity)) {

      }
    })
  }
}
