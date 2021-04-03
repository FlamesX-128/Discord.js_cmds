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
exports.validateArgs = void 0;
function validateArgs(message, Args, prefix, command, expectedArgs) {
    return __awaiter(this, void 0, void 0, function* () {
        const { content } = message;
        if (Args.requiredOne == false && (Args.requiredTree == true || Args.requiredTwo == true)) {
            console.log(`The first argument are disabled, but argument second or three are enabled.`);
            return false;
        }
        else if (Args.requiredTwo == false && Args.requiredTree == true) {
            console.log(`The second argument are disabled, but argument three are enabled.`);
            return false;
        }
        ;
        const args = content.split(/[ ]+/);
        args.shift();
        try {
            if (Args.requiredOne == true) {
                if (args[0].length < Args.minArgsOne || (Args.maxArgsOne !== null && args[0].length > Args.maxArgsOne)) {
                    yield message.reply(`Incorrect requested arguments! Use: ${prefix}${command} ${expectedArgs}`);
                    return false;
                }
                ;
            }
            if (Args.requiredTwo == true) {
                if (args[1].length < Args.minArgsTwo || (Args.maxArgsTwo !== null && args[1].length > Args.maxArgsTwo)) {
                    yield message.reply(`Incorrect requested arguments! Use: ${prefix}${command} ${expectedArgs}`);
                    return false;
                }
                ;
            }
            if (Args.requiredTree == true) {
                if (args[2].length < Args.minArgsTree || (Args.maxArgsTree !== null && args[2].length > Args.maxArgsTree)) {
                    yield message.reply(`Incorrect requested arguments! Use: ${prefix}${command} ${expectedArgs}`);
                    return false;
                }
                ;
            }
            ;
        }
        catch (_a) {
            yield message.reply(`Incorrect requested arguments! Use: ${prefix}${command} ${expectedArgs}`);
            return false;
        }
        ;
        return true;
    });
}
exports.validateArgs = validateArgs;
