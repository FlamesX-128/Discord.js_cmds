import { validateCommand } from './validateCommand'

export class commandBase {
    protected command: {
        command: string;
        aliases: null | string | string[];
    };
    protected category: null | string | string[];
    protected IsActivated: boolean;
    protected Args: {
        requiredOne: boolean;
        minArgsOne: number;
        maxArgsOne: null | number;
        requiredTwo: boolean;
        minArgsTwo: number;
        maxArgsTwo: null | number;
        requiredTree: boolean;
        minArgsTree: number;
        maxArgsTree: null | number;
    };
    protected Perms: {
        Alternative: boolean;
        requiredRoles: string[];
        requiredPerms: string[];
    };
    protected expectedArgs: null | string;

    protected constructor() {
        this.command = {
            command: 'undefined',
            aliases: null,
        },
        this.category = null,
        this.IsActivated = false,
        this.Args = {
            requiredOne: false,
            minArgsOne: 0,
            maxArgsOne: null,
            requiredTwo: false,
            minArgsTwo: 0,
            maxArgsTwo: null,
            requiredTree: false,
            minArgsTree: 0,
            maxArgsTree: null
        },
        this.Perms = {
            Alternative: false,
            requiredRoles: [],
            requiredPerms: []
        },
        this.expectedArgs = null;
    };

    async execute(prefix: string, message: any) {
        const result: boolean = await validateCommand(
            prefix,
            message,
            this.command,
            this.IsActivated,
            this.Args,
            this.Perms,
            this.expectedArgs
        );

        if(result == true) {
            await this.validCommand(message)
        };
    };

    async validCommand(message: any){
        console.log("undefined");
    };
};