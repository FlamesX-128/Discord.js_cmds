import { commandBase } from './commands/cmdBase';
import { checkArgs } from './tools/checkArgs/checkArgs';
import { validatePermissions, checkPermissions } from './tools/checkPerms/checkPermissions';
import { checkPerms } from './tools/checkPerms/checkPerms';
import { checkRoles } from './tools/checkPerms/checkRoles';
import { readCommands } from './tools/readCommands';
import { readFiles } from './tools/readFiles';
import { validateCmds } from './tools/validateCmds';

module.exports = {
    commandBase,
    checkArgs,
    checkPermissions,
    checkPerms,
    checkRoles,
    validatePermissions,
    readCommands,
    readFiles,
    validateCmds
};