import { commandBase } from './commands/commandBase';
import { checkPermissions } from './tools/checkPermissions';
import { validateArgs } from './tools/validateArgs';
import { validateCommand } from './tools/validateCommand';
import { checkPerms } from './tools/helpers/checkPerms';
import { checkRoles } from './tools/helpers/checkRoles';
import { validatePermissions } from './tools/helpers/validatePermissions';

import path from 'path';
import fs from 'fs';

const commands: any = [];

export async function readFiles(directory: any, target: any): Promise<void> {
    const files = fs.readdirSync(path.join(directory, target));

    for (const file of files) {
        const stat = fs.lstatSync(path.join(directory, target, file));

        if (stat.isDirectory()) {
            readFiles(directory, path.join(target, file));
            
        } else {
            const option = require(path.join(directory, target, file));
            commands.push(option);
            console.log(file, option);
        };
    };
};

export async function readCommand(prefix: string, message: any): Promise<void> {
    const { content } = message;
    const args = content.split(/[ ]+/);
    const command = args[0].split(`${prefix}`);
    command.shift();
    args.shift();

    try {
        for (let Case = 0; Case < commands.length; Case++) {
            if (commands[Case].name.command == command) {
                commands[Case].checkCommand(prefix, message);
            } else {
                for (let CASE = 0; CASE < commands[Case].name.aliases.length; CASE++) {
                    if (commands[Case].name.aliases[CASE] == command) {
                        return commands[Case].checkCommand(prefix, message);
                    };
                };
            };
        };
    } catch {
        return;
    };
};

module.exports = {
    commandBase,
    checkPermissions,
    validateArgs,
    validateCommand,
    checkPerms,
    checkRoles,
    validatePermissions,
    readFiles,
    readCommand
};