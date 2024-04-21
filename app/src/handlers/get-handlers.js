"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAllIpcGetFunctions = void 0;
const electron_1 = require("electron");
const entity_store_1 = require("../storage/entity-store");
function registerAllIpcGetFunctions() {
    electron_1.ipcMain.handle('GET-ALL-ENTITIES-OF-TYPE', (event, entityType) => __awaiter(this, void 0, void 0, function* () {
        return entity_store_1.ENTITY_MANAGER.getEntitiesOfType(entityType);
    }));
}
exports.registerAllIpcGetFunctions = registerAllIpcGetFunctions;
//# sourceMappingURL=get-handlers.js.map