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
    return new Promise(async (resolve, reject) => {
      let currentUUID = uuid;
      // If UUID is blank, or does not exist in data, then it's a new entity.
      // So get a new UUID, and generate the image name.
      if(uuid === '' || !this.masterDataManagement.hasEntity(uuid, entity)) {
        await this.angularElectronInterface.getGeneratedUUID().then((result) => {
          currentUUID = result;
          entity.imageID = this.angularElectronInterface.getFormattedImageID(currentUUID, entity.title);
        })
      }
      // Send the entity to electron to be saved.
      await this.angularElectronInterface.sendEntityToFs(currentUUID, entity).then((result) =>{
        resolve(true);
      }).catch((error) => {
        reject(false);
      });
    })
  }
}
