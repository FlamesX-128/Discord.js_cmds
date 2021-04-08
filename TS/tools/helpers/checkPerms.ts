import { checkRoles } from "./checkRoles";

export async function checkPerms(
    message: any,
    Alternative: boolean,
    requiredPerms: string[],
    requiredRoles: string[],
    checkAlter: boolean
): Promise<boolean> {
    const { member } = message;

    for (const permission of requiredPerms) {
        if (!member.hasPermission(permission)) {
            if (Alternative == true) {
                if (checkAlter == false) {
                    const CheckAlter: boolean = true;
                    const result: boolean = await checkRoles(
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
                await message.reply('You do not have permissions to execute this command!');
                return false;
            };
        };
    };
    
    return true;
};