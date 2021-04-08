import { validatePermissions } from "./helpers/validatePermissions";
import { checkPerms } from "./helpers/checkPerms";
import { checkRoles } from "./helpers/checkRoles";

export async function checkPermissions(
    message: any,
    Perms: any
): Promise<boolean> {
    if (Perms.requiredPerms.length) {
        await validatePermissions(Perms.requiredPerms);

        const valid: boolean = await checkPerms(
            message,
            Perms.Alternative,
            Perms.requiredPerms,
            Perms.requiredRoles,
            false
        );

        if (valid == false) return false;
    };

    if (Perms.requiredRoles.length) {
        const valid: boolean = await checkRoles(
            message,
            Perms.Alternative,
            Perms.requiredPerms,
            Perms.requiredRoles,
            false
        );

        if (valid == false) return false;
    };

    return true;
};