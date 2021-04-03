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
exports.commandBase = void 0;
const validateCommand_1 = require("./validateCommand");
//var STRING: null | string | string[]
class commandBase {
    constructor() {
        this.command = '';
        this.category = null,
            this.IsActivated = false,
            this.Args = {
                requiredOne: false,
                minArgsOne: 0,
                maxArgsOne: null,
                requiredTwo: false,
                minArgsTwo: 0,
                maxArgsTwo: null,
                requiredTree: false,
                minArgsTree: 0,
                maxArgsTree: null
            },
            this.Perms = {
                Alternative: false,
                requiredRoles: [],
                requiredPerms: []
            },
            this.expectedArgs = '';
    }
    ;
    checkCommand(prefix, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const valid = yield validateCommand_1.validateCommand(prefix, message, this.command, this.IsActivated, this.Args, this.expectedArgs, this.Perms);
            if (valid == true) {
                yield this.execute(message);
            }
            ;
        });
    }
    ;
    execute(message) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("undefined");
        });
    }
    ;
}
exports.commandBase = commandBase;
;
