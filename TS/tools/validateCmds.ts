import { TypeCommand, TypeArgs, TypePerms } from '../interfaces/cmdBase';
import { checkPermissions } from './checkPerms/checkPermissions';
import { checkArgs } from './checkArgs/checkArgs';

export async function validateCmds(
    message: any,
    args: string[],
    Command: TypeCommand,
    Args: TypeArgs,
    Perms: TypePerms
): Promise<boolean> {
    if (Command.activated === false) {
        console.log(`\x1b[36m[WARN] \x1b[0mThe "${Command.name}" command is disabled`);
        return false;
    };

    const validPerms: boolean = await checkPermissions(
        message,
        Perms
    );
    if (validPerms == false) return false;

    const validArgs: boolean = await checkArgs(
        message,
        args,
        Args
    );
    if (validArgs == false) return false;

    return true;
};