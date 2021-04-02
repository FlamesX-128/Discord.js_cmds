const validatePerms = async (permissions: string[]) => {
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
        };
    };
};

export async function validateCommand(
    prefix: string,
    message: any,
    command: {
        command: string;
        aliases: null | string | string[];
    },
    IsActivated: boolean,
    Args: {
        requiredOne: boolean;
        minArgsOne: number;
        maxArgsOne: null | number;
        requiredTwo: boolean;
        minArgsTwo: number;
        maxArgsTwo: null | number;
        requiredTree: boolean;
        minArgsTree: number;
        maxArgsTree: null | number;
    },
    Perms: {
        Alternative: boolean;
        requiredRoles: string[];
        requiredPerms: string[];
    },
    expectedArgs: null | string
    ) {
        const { content, guild, member} = message;
        const args = message.content.split(/[ ]+/);
        args.shift();

        if (IsActivated == false) {
            return false;
        
        } else if (Args.requiredOne == true) {
            if (args[0].length < Args.minArgsOne || (Args.maxArgsOne !== null && args[0] > Args.maxArgsOne)) {
                await message.reply(`Incorrect requested arguments! Use: ${prefix}${command.command} ${expectedArgs}`);
                return false;
            };

        } else if (Args.requiredTwo == true) {
            if (args[1].length < Args.minArgsTwo || (Args.maxArgsTwo !== null && args[1] > Args.maxArgsTwo)) {
                await message.reply(`Incorrect requested arguments! Use: ${prefix}${command.command} ${expectedArgs}`);
                return false;
            };
        
        } else if (Args.requiredTree == true) {
            if (args[2].length < Args.minArgsTree || (Args.maxArgsTree !== null && args[2] > Args.maxArgsTree)) {
                await message.reply(`Incorrect requested arguments! Use: ${prefix}${command.command} ${expectedArgs}`);
                return false;
            };
        
        } else if (Perms.requiredPerms.length) {
            await validatePerms(Perms.requiredPerms);
            const result: boolean = await validPerms(message, member, Perms.Alternative, Perms.requiredPerms, Perms.requiredRoles);
            if (result == false) return false;

        } else if (Perms.requiredRoles.length) {
            const result: boolean = await validRoles(message, member, Perms.Alternative, Perms.requiredPerms, Perms.requiredRoles);
            if (result == false) return false;
        } return true;
};

async function validPerms(
    message: any,
    member: any,  
    Alternative: boolean, 
    requiredPerms: string[], 
    requiredRoles: string[],
    checkAlter?: boolean
    ) {
        for (const permission of requiredPerms) {
            if (!member.hasPermissions(permission)) {
                if (Alternative == true) {
                    if (checkAlter == false) {
                        checkAlter = true;
                        await validRoles(member, message, Alternative, requiredPerms, requiredRoles, checkAlter)

                    } else {
                        await message.reply("You don't have the permissions or roles to run this command")
                        return false;
                    }

                } else {
                    await message.reply('You do not have permissions to execute this command!')
                    return false;
                };
            };
        } return true;
};

async function validRoles(
    message: any,
    member: any,  
    Alternative: boolean, 
    requiredPerms: string[], 
    requiredRoles: string[],
    checkAlter?: boolean
    ) {
        for (const requiredRole of requiredRoles) {
            const { guild } = message;
            const role = await guild.roles.cache.find (
                (role: any) => role.name === requiredRole
            );

            if(!role || !member.roles.cache.has(role.id)) {
                if (Alternative == true) {
                    if (checkAlter == false) {
                        checkAlter = true;
                        await validPerms(member, message, Alternative, requiredPerms, requiredRoles, checkAlter)

                    } else {
                        await message.reply("You don't have the permissions or roles to run this command");
                        return false;
                    }

                } else {
                    await message.reply(`You must have the role "${requiredRole}" role to use this command!`);
                    return false;
                };
            };
        } return true;
};