import { checkPermissions } from './checkPermissions';
import { validateArgs } from './validateArgs'

export async function validateCommand(
    prefix: string,
    message: any,
    name: any,
    IsActivated: boolean,
    Args: {
        numberOfArgs: null | number;
        minArgs: number;
        maxArgs: null | number;
    },
    Perms: {
        Alternative: boolean;
        requiredRoles: string[];
        requiredPerms: string[];
    },
    expectedArgs: null | string
): Promise<boolean> {
    if (IsActivated == false) return false;

    const validPerms: boolean = await checkPermissions(
        message,
        Perms
    );

    const validArgs: boolean = await validateArgs(
        message,
        Args,
        prefix,
        name,
        expectedArgs
    );

    if (validPerms && validArgs == true) return true;

    return false;
};