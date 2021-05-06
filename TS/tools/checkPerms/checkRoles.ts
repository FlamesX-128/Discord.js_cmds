import { TypePerms } from "../../interfaces/cmdBase";
import { checkPerms } from "./checkPerms";

export async function checkRoles(
    message: any,
    Perms: TypePerms,
    checkAlter: boolean
): Promise<boolean> {
    if (Perms.requiredRoles !== null) {
        for (const requiredRole of Perms.requiredRoles) {
            const role = await message.guild.roles.cache.find(
                (role: any) => role.name === requiredRole
            );
    
            if (!role || !message.member.roles.cache.has(role.id)) {
                if (Perms.alternative == true) {
                    if (checkAlter == false) {
                        const result: boolean = await checkPerms(
                            message,
                            Perms,
                            true
                        );
    
                        if (result == false) return false;
    
                    } else {
                        message.reply("You don't have the permissions or roles to run this command");
                        return false;
                    };
    
                } else {
                    message.reply(`You must have the role "${requiredRole}" role to use this command!`);
                    return false;
                };
            };
        };
    };
    
    return true;
};