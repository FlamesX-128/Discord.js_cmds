import { TypePerms } from "../../interfaces/cmdBase";
import { checkRoles } from "./checkRoles";

export async function checkPerms(
    message: any,
    Perms: TypePerms,
    checkAlter: boolean
): Promise<boolean> {
    if (Perms.requiredPerms !== null) {
        for (const permission of Perms.requiredPerms) {
            if (!message.member.hasPermission(permission)) {
                if (Perms.alternative == true) {
                    if (checkAlter == false) {
                        const result: boolean = await checkRoles(
                            message,
                            Perms,
                            true,
                        );
    
                        if (result == false) return false;
    
                    } else {
                        message.reply("You don't have the permissions or roles to run this command");
                        return false;
                    };
    
                } else {
                    message.reply('You do not have permissions to execute this command!');
                    return false;
                };
            };
        };
    };
    
    return true;
};