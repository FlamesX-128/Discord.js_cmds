import { checkPerms } from "./checkPerms";

export async function checkRoles(
    message: any,
    Alternative: boolean, 
    requiredPerms: string | string[], 
    requiredRoles: string | string[],
    checkAlter: boolean
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
                        const result: boolean = await checkPerms(
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