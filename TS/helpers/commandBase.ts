import { validateCommand } from './validateCommand'

//var STRING: null | string | string[]

export class commandBase {
    public command: string;
    public category: null | string | string[];
    public IsActivated: boolean;
    public Args: {
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
    public Perms: {
        Alternative: boolean;
        requiredRoles: string | string[];
        requiredPerms: string | string[];
    };
    public expectedArgs: null | string;

    public constructor() {
        this.command = ''
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
        this.expectedArgs = '';
    };

    public async checkCommand(prefix: string, message: any) {
        const valid: boolean = await validateCommand(
            prefix,
            message,
            this.command,
            this.IsActivated,
            this.Args,
            this.Perms,
            this.expectedArgs
        );

        if(valid == true) {
            await this.execute(message);
        };
    };

    public async execute(message: any){
        console.log("undefined");
    };
};