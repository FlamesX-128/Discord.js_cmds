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
exports.validateCommand = void 0;
const validateArgs_1 = require("./validations/validateArgs");
const validatePerms_1 = require("./validations/validatePerms");
function validateCommand(prefix, message, command, IsActivated, Args, expectedArgs, Perms) {
    return __awaiter(this, void 0, void 0, function* () {
        if (IsActivated == false)
            return false;
        const validPerms = yield validatePerms_1.validatePermissions(message, Perms);
        const validArgs = yield validateArgs_1.validateArgs(message, Args, prefix, command, expectedArgs);
        if (validPerms && validArgs == true)
            return true;
        return false;
    });
}
exports.validateCommand = validateCommand;
;
