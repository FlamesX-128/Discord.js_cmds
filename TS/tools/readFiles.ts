import { commands } from './readCommands';
import path from 'path';
import fs from 'fs';

export async function readFiles(directory: string, target: string): Promise<void> {
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