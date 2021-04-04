import { validatePermissions } from "./validatePermissions";
import { checkPerms } from "./checkPerms";
import { checkRoles } from "./checkRoles";

export async function checkPermissions(
    message: any, 
    Perms: any
    ): Promise<boolean> {
        if (Perms.requiredPerms.length) {
            if (typeof Perms.requiredPerms === 'string') {
                Perms.requiredPerms = [Perms.requiredPerms]
            };

            const valid: boolean = await validatePermissions(Perms.requiredPerms);

            if (valid == true) {
                const result: boolean = await checkPerms(
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

            const result: boolean = await checkRoles(
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