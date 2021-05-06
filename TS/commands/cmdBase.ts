import { validateCmds } from '../tools/validateCmds';
import { TypeCommand, TypeArgs, TypePerms } from '../interfaces/cmdBase';

export class commandBase {
    Command: TypeCommand;
    Args: TypeArgs;
    Perms: TypePerms;

    constructor() {
        this.Command = {
            name: '未定義',
            aliases: null,
            category: null,
            activated: false
        };
        this.Args = {
            expectedArgs: null,
            numberOfArgs: null,
            NotMoreArgs: false,
            argsError: null,
            minArgs: null,
            maxArgs: null
        };
        this.Perms = {
            alternative: false,
            requiredRoles: null,
            requiredPerms: null
        };
    };

    async checkCommand(prefix: string, message: any, args: string[]): Promise<void> {        
        const result: boolean = await validateCmds(
            message,
            args,
            this.Command,
            this.Args,
            this.Perms
        );

        if (result == true) this.execute(prefix, message, args);
    };

    async execute(prefix: string, message: any, args: string[]): Promise<void> {
        message.reply(`How did you use this command lol?`);
    };
};