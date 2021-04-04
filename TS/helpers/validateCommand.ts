import { checkPermissions } from './validations/validatePerms/checkPermissions';
import { validateArgs } from './validations/validateArgs'

export async function validateCommand(
    prefix: string,
    message: any,
    command: string,
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
        requiredRoles: string | string[];
        requiredPerms: string | string[];
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
            command, 
            expectedArgs
        );
        
        if (validPerms && validArgs == true) return true;
        return false;
};