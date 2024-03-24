## Responsibilities

### Angular
- Hold data in memory
- MasterDataManagement service is only responsible for HOLDING data.

### Electron
- Reading from the fs
- Writing to the fs
- Generating UUIDs

## Logic Flows

### Saving a new entity
1. User fills in all of the details. The form is holding an array buffer of the image, and does not have a UUID yet.
2. User clicks submit.
3. Angular makes a request to Electron to get a UUID via Angular Electron service.
4. UUID is passed back to the form.
5. The form calls `getFormattedImageID` from the AngularElectronInterface service to get its movie entities imageID field.
6. The form tries to save the new entity to the fs via AngularElectronInterface service.
7. If saved to the fs successfully, then pass the new entity to be held by the MasterDataManagement service.
