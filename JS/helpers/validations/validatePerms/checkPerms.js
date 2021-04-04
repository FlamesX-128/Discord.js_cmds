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
exports.checkPerms = void 0;
const checkRoles_1 = require("./checkRoles");
function checkPerms(message, Alternative, requiredPerms, requiredRoles, checkAlter) {
    return __awaiter(this, void 0, void 0, function* () {
        const { member } = message;
        for (const permission of requiredPerms) {
            if (!member.hasPermission(permission)) {
                if (Alternative == true) {
                    if (checkAlter == false) {
                        const CheckAlter = true;
                        const result = yield checkRoles_1.checkRoles(message, Alternative, requiredPerms, requiredRoles, CheckAlter);
                        if (result == false)
                            return false;
                    }
                    else {
                        yield message.reply("You don't have the permissions or roles to run this command");
                        return false;
                    }
                }
                else {
                    yield message.reply('You do not have permissions to execute this command!');
                    return false;
                }
                ;
            }
            ;
        }
        ;
        return true;
    });
}
exports.checkPerms = checkPerms;
;
