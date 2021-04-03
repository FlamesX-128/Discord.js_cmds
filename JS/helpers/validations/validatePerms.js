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
exports.validatePermissions = exports.validRoles = exports.validPerms = exports.checkPermissions = void 0;
const checkPermissions = (permissions) => __awaiter(void 0, void 0, void 0, function* () {
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
            console.log(`Unknown permission node ${permission}"`);
            return false;
        }
        ;
    }
    return true;
});
exports.checkPermissions = checkPermissions;
function validPerms(message, Alternative, requiredPerms, requiredRoles, checkAlter) {
    return __awaiter(this, void 0, void 0, function* () {
        const { member } = message;
        for (const permission of requiredPerms) {
            if (!member.hasPermission(permission)) {
                if (Alternative == true) {
                    if (checkAlter == false) {
                        const CheckAlter = true;
                        const result = yield validRoles(message, Alternative, requiredPerms, requiredRoles, CheckAlter);
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
exports.validPerms = validPerms;
;
function validRoles(message, Alternative, requiredPerms, requiredRoles, checkAlter) {
    return __awaiter(this, void 0, void 0, function* () {
        const { guild, member } = message;
        for (const requiredRole of requiredRoles) {
            const role = yield guild.roles.cache.find((role) => role.name === requiredRole);
            if (!role || !member.roles.cache.has(role.id)) {
                if (Alternative == true) {
                    if (checkAlter == false) {
                        const CheckAlter = true;
                        const result = yield validPerms(message, Alternative, requiredPerms, requiredRoles, CheckAlter);
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
exports.validRoles = validRoles;
;
function validatePermissions(message, Perms) {
    return __awaiter(this, void 0, void 0, function* () {
        if (Perms.requiredPerms.length) {
            if (typeof Perms.requiredPerms === 'string') {
                Perms.requiredPerms = [Perms.requiredPerms];
            }
            ;
            const valid = yield exports.checkPermissions(Perms.requiredPerms);
            if (valid == true) {
                const result = yield validPerms(message, Perms.Alternative, Perms.requiredPerms, Perms.requiredRoles, false);
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
            const result = yield validRoles(message, Perms.Alternative, Perms.requiredPerms, Perms.requiredRoles, false);
            if (result == false)
                return false;
        }
        ;
        return true;
    });
}
exports.validatePermissions = validatePermissions;
