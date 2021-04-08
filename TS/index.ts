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
            await readFiles(directory, path.join(target, file));
            
        } else {
            const option = await require(path.join(directory, target, file));
            await commands.push(option);
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
        await commands.forEach(async (element: any) => {
            if (await element.name.command == await command) {
                return await element.checkCommand(prefix, message);
                
            } else {
                const alias = await element.name.aliases;
                
                if (alias) {
                    await alias.forEach(async (Element: any) => {
                        if (await Element == await command) {
                            return await element.checkCommand(prefix, message);
                        };
                    });
                };
            };
        });
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