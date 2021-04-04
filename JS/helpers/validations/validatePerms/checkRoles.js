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
exports.checkRoles = void 0;
const checkPerms_1 = require("./checkPerms");
function checkRoles(message, Alternative, requiredPerms, requiredRoles, checkAlter) {
    return __awaiter(this, void 0, void 0, function* () {
        const { guild, member } = message;
        for (const requiredRole of requiredRoles) {
            const role = yield guild.roles.cache.find((role) => role.name === requiredRole);
            if (!role || !member.roles.cache.has(role.id)) {
                if (Alternative == true) {
                    if (checkAlter == false) {
                        const CheckAlter = true;
                        const result = yield checkPerms_1.checkPerms(message, Alternative, requiredPerms, requiredRoles, CheckAlter);
                        if (result == false)
                            return false;
                    }
                    else {
                        yield message.reply("You don't have the permissions or roles to run this command");
                        return false;
                    }
                    ;
                }
                else {
                    yield message.reply(`You must have the role "${requiredRole}" role to use this command!`);
                    return false;
                }
                ;
            }
            ;
        }
        return true;
    });
}
exports.checkRoles = checkRoles;
;
