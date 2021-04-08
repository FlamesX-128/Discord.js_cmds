import { validateCommand } from '../tools/validateCommand'

export class commandBase {
    public name: {
        command: string,
        aliases: null | string[];
    };
    public category: null | string[];
    public IsActivated: boolean;
    public Args: {
        numberOfArgs: null | number;
        minArgs: number;
        maxArgs: null | number;
    };
    public Perms: {
        Alternative: boolean;
        requiredRoles: string[];
        requiredPerms: string[];
    };
    public expectedArgs: null | string;

    public constructor() {
        this.name = {
            command: '',
            aliases: null
        }
        this.category = null;
        this.IsActivated = false;
        this.Args = {
            numberOfArgs: null,
            minArgs: 0,
            maxArgs: null
        };
        this.Perms = {
            Alternative: false,
            requiredRoles: [],
            requiredPerms: []
        };
        this.expectedArgs = '';
    };

    public async checkCommand(prefix: string, message: any): Promise<void> {
        const valid: boolean = await validateCommand(
            prefix,
            message,
            this.name,
            this.IsActivated,
            this.Args,
            this.Perms,
            this.expectedArgs
        );

        if (valid == true) {
            await this.execute(message);
        };
    };

    public async execute(message: any): Promise<void> {
        console.log("undefined");
    };
};