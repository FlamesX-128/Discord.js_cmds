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
exports.readCommand = void 0;
function readCommand(prefix, message, commandList) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { content } = message;
            const args = content.split(/[ ]+/);
            const command = args[0].split(prefix);
            command.shift();
            args.shift();
            commandList[command].execute(prefix, message, commandList);
        }
        catch (err) {
            console.log(err);
        }
        ;
    });
}
exports.readCommand = readCommand;
;
