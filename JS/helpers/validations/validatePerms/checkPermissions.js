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
exports.checkPermissions = void 0;
const validatePermissions_1 = require("./validatePermissions");
const checkPerms_1 = require("./checkPerms");
const checkRoles_1 = require("./checkRoles");
function checkPermissions(message, Perms) {
    return __awaiter(this, void 0, void 0, function* () {
        if (Perms.requiredPerms.length) {
            if (typeof Perms.requiredPerms === 'string') {
                Perms.requiredPerms = [Perms.requiredPerms];
            }
            ;
            const valid = yield validatePermissions_1.validatePermissions(Perms.requiredPerms);
            if (valid == true) {
                const result = yield checkPerms_1.checkPerms(message, Perms.Alternative, Perms.requiredPerms, Perms.requiredRoles, false);
                if (result == false)
                    return false;
            }
            else {
                return false;
            }
            ;
        }
        ;
        if (Perms.requiredRoles.length) {
            if (typeof Perms.requiredRoles === 'string') {
                Perms.requiredRoles = [Perms.requiredRoles];
            }
            ;
            const result = yield checkRoles_1.checkRoles(message, Perms.Alternative, Perms.requiredPerms, Perms.requiredRoles, false);
            if (result == false)
                return false;
        }
        ;
        return true;
    });
}
exports.checkPermissions = checkPermissions;
