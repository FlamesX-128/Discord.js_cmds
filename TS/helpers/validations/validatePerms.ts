export const checkPermissions = async (permissions: string[]): Promise<boolean> => {
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
        };
    } return true;
};

export async function validPerms(
    message: any,
    Alternative: boolean, 
    requiredPerms: string | string[], 
    requiredRoles: string | string[],
    checkAlter?: boolean
    ): Promise<boolean> {
        const { member } = message;

        for (const permission of requiredPerms) {
            if (!member.hasPermission(permission)) {
                if (Alternative == true) {
                    if (checkAlter == false) {
                        const CheckAlter: boolean = true;
                        const result: boolean = await validRoles(
                            message, 
                            Alternative, 
                            requiredPerms, 
                            requiredRoles, 
                            CheckAlter
                        );
                        
                        if (result == false) return false;

                    } else {
                        await message.reply("You don't have the permissions or roles to run this command")
                        return false;
                    }

                } else {
                    await message.reply('You do not have permissions to execute this command!')
                    return false;
                };
            };
        };
        return true;
};

export async function validRoles(
    message: any,
    Alternative: boolean, 
    requiredPerms: string | string[], 
    requiredRoles: string | string[],
    checkAlter?: boolean
    ): Promise<boolean> {
        const { guild, member } = message;

        for (const requiredRole of requiredRoles) {
            const role = await guild.roles.cache.find (
                (role: any) => role.name === requiredRole
            );

            if(!role || !member.roles.cache.has(role.id)) {
                if (Alternative == true) {
                    if (checkAlter == false) {
                        const CheckAlter: boolean = true;
                        const result: boolean = await validPerms(
                            message, 
                            Alternative, 
                            requiredPerms, 
                            requiredRoles, 
                            CheckAlter
                        );

                        if (result == false) return false;

                    } else {
                        await message.reply("You don't have the permissions or roles to run this command");
                        return false;
                    };

                } else {
                    await message.reply(`You must have the role "${requiredRole}" role to use this command!`);
                    return false;
                };
            };
        } return true;
};

export async function validatePermissions(
    message: any, 
    Perms: any
    ): Promise<boolean> {
        if (Perms.requiredPerms.length) {
            if (typeof Perms.requiredPerms === 'string') {
                Perms.requiredPerms = [Perms.requiredPerms]
            };

            const valid: boolean = await checkPermissions(Perms.requiredPerms);

            if (valid == true) {
                const result: boolean = await validPerms(
                    message, 
                    Perms.Alternative, 
                    Perms.requiredPerms, 
                    Perms.requiredRoles,
                    false
                );

                if (result == false) return false;
            } else { 
                return false; 
            };
        };
        
        if (Perms.requiredRoles.length) {
            if (typeof Perms.requiredRoles === 'string') {
                Perms.requiredRoles = [Perms.requiredRoles]
            };

            const result: boolean = await validRoles(
                message, 
                Perms.Alternative, 
                Perms.requiredPerms, 
                Perms.requiredRoles,
                false
            );

            if (result == false) return false;
        };
        return true;
}