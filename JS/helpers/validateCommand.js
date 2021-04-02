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
const validatePerms = (permissions) => __awaiter(void 0, void 0, void 0, function* () {
    const validPerms = [
        'CREATE_INSTANT_INVITE',
        'KICK_MEMBERS',
        'BAN_MEMBERS',
        'ADMINISTRATOR',
        'MANAGE_CHANNELS',
        'MANAGE_GUILD',
        'ADD_REACTIONS',
        'VIEW_AUDIT_LOG',
        'PRIORITY_SPEAKER',
        'STREAM',
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'SEND_TTS_MESSAGES',
        'MANAGE_MESSAGES',
        'EMBED_LINKS',
        'ATTACH_FILES',
        'READ_MESSAGE_HISTORY',
        'MENTION_EVERYONE',
        'USE_EXTERNAL_EMOJIS',
        'VIEW_GUILD_INSIGHTS',
        'CONNECT',
        'SPEAK',
        'MUTE_MEMBERS',
        'DEAFEN_MEMBERS',
        'MOVE_MEMBERS',
        'USE_VAD',
        'CHANGE_NICKNAME',
        'MANAGE_NICKNAMES',
        'MANAGE_ROLES',
        'MANAGE_WEBHOOKS',
        'MANAGE_EMOJIS'
    ];
    for (const permission of permissions) {
        if (!validPerms.includes(permission)) {
            throw new Error(`Unknown permission node ${permission}"`);
        }
        ;
    }
    ;
});
function validateCommand(prefix, message, command, IsActivated, Args, Perms, expectedArgs) {
    return __awaiter(this, void 0, void 0, function* () {
        const { content, guild, member } = message;
        const args = message.content.split(/[ ]+/);
        args.shift();
        if (IsActivated == false) {
            return false;
        }
        else if (Args.requiredOne == true) {
            if (args[0].length < Args.minArgsOne || (Args.maxArgsOne !== null && args[0] > Args.maxArgsOne)) {
                yield message.reply(`Incorrect requested arguments! Use: ${prefix}${command.command} ${expectedArgs}`);
                return false;
            }
            ;
        }
        else if (Args.requiredTwo == true) {
            if (args[1].length < Args.minArgsTwo || (Args.maxArgsTwo !== null && args[1] > Args.maxArgsTwo)) {
                yield message.reply(`Incorrect requested arguments! Use: ${prefix}${command.command} ${expectedArgs}`);
                return false;
            }
            ;
        }
        else if (Args.requiredTree == true) {
            if (args[2].length < Args.minArgsTree || (Args.maxArgsTree !== null && args[2] > Args.maxArgsTree)) {
                yield message.reply(`Incorrect requested arguments! Use: ${prefix}${command.command} ${expectedArgs}`);
                return false;
            }
            ;
        }
        else if (Perms.requiredPerms.length) {
            yield validatePerms(Perms.requiredPerms);
            const result = yield validPerms(message, member, Perms.Alternative, Perms.requiredPerms, Perms.requiredRoles);
            if (result == false)
                return false;
        }
        else if (Perms.requiredRoles.length) {
            const result = yield validRoles(message, member, Perms.Alternative, Perms.requiredPerms, Perms.requiredRoles);
            if (result == false)
                return false;
        }
        return true;
    });
}
exports.validateCommand = validateCommand;
;
function validPerms(message, member, Alternative, requiredPerms, requiredRoles, checkAlter) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const permission of requiredPerms) {
            if (!member.hasPermissions(permission)) {
                if (Alternative == true) {
                    if (checkAlter == false) {
                        checkAlter = true;
                        yield validRoles(member, message, Alternative, requiredPerms, requiredRoles, checkAlter);
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
        return true;
    });
}
;
function validRoles(message, member, Alternative, requiredPerms, requiredRoles, checkAlter) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const requiredRole of requiredRoles) {
            const { guild } = message;
            const role = yield guild.roles.cache.find((role) => role.name === requiredRole);
            if (!role || !member.roles.cache.has(role.id)) {
                if (Alternative == true) {
                    if (checkAlter == false) {
                        checkAlter = true;
                        yield validPerms(member, message, Alternative, requiredPerms, requiredRoles, checkAlter);
                    }
                    else {
                        yield message.reply("You don't have the permissions or roles to run this command");
                        return false;
                    }
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
;
