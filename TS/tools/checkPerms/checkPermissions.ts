import { checkPerms } from "./checkPerms";
import { checkRoles } from "./checkRoles";
import { TypePerms } from "../../interfaces/cmdBase";

export const validatePermissions = async (requiredPerms: string[]): Promise<void> => {
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

    for (const TypeOfValue of requiredPerms) {
        if (!validPerms.includes(TypeOfValue)) throw new Error(`Unknown permission node ${TypeOfValue}"`);
    };
};

export async function checkPermissions(
    message: any,
    Perms: TypePerms
): Promise<boolean> {
    if (Perms.requiredPerms !== null && !Perms.requiredPerms.length) throw new Error('You activated the required permissions, but they have no content');
    if (Perms.requiredRoles !== null && !Perms.requiredRoles.length) throw new Error('You activated the required roles, but they have no content');
    if (Perms.alternative === true) {
        if (Perms.requiredPerms === null) throw new Error(`Alternative is enabled but requiredPerms is null`);
        if (Perms.requiredRoles === null) throw new Error(`Alternative is enabled but requiredRoles is null`);
    };

    if (Perms.requiredPerms !== null && Perms.requiredPerms.length) {
        await validatePermissions(Perms.requiredPerms);

        const valid: boolean = await checkPerms(
            message,
            Perms,
            false
        );

        if (valid == false) return false;
    };

    if (Perms.requiredRoles !== null && Perms.requiredRoles.length) {
        const valid: boolean = await checkRoles(
            message,
            Perms,
            false
        );

        if (valid == false) return false;
    };

    return true;
};