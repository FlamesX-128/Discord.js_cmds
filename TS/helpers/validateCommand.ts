import { validateArgs } from './validations/validateArgs'
import { validatePermissions } from './validations/validatePerms'

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
    expectedArgs: null | string,
    Perms: {
        Alternative: boolean;
        requiredRoles: string | string[];
        requiredPerms: string | string[];
    }
    ): Promise<boolean> {        
        if (IsActivated == false) return false;
        const validPerms: boolean = await validatePermissions(
            message, 
            Perms
        )

        const validArgs: boolean = await validateArgs(
            message, 
            Args, 
            prefix, 
            command, 
            expectedArgs
        )
        
        if (validPerms && validArgs == true) return true;
        return false;
};