declare module '@flamesx_128/discord.js_cmds' {

    /*=====================================================================================================
            VALIDATE PERMISSIONS AND ROLS
    =====================================================================================================*/

    export function checkPermissions(
        message: any,
        Perms: any
    ): Promise<boolean>;

    export function checkPerms(
        message: any,
        Alternative: boolean,
        requiredPerms: string[],
        requiredRoles: string[],
        checkAlter?: boolean
    ): Promise<boolean>;

    export function checkRoles(
        message: any,
        Alternative: boolean,
        requiredPerms: string[],
        requiredRoles: string[],
        checkAlter?: boolean
    ): Promise<boolean>;

    export function validatePermissions(
        permissions: string[]
    ): Promise<void>;

    export function validateArgs(
        message: any,
        Args: any,
        prefix: string,
        name: any,
        expectedArgs: null | string
    ): Promise<boolean>;

    /*=====================================================================================================
            COMMAND BASE
    =====================================================================================================*/

    export class commandBase {
        public name: {
            command: string,
            aliases: null | string[]
        }
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

        public constructor();
        public checkCommand(prefix: string, message: any): Promise<void>;
        public execute(message: any): Promise<void>;
    }

    /*=====================================================================================================
            READ COMMANDS
    =====================================================================================================*/

    export function readFiles(
        directory: any,
        target: any
    ): Promise<void>;

    export function readCommand(
        prefix: string,
        message: any
    ): Promise<void>;

    /*=====================================================================================================
            VALIDATE COMMAND
    =====================================================================================================*/

    export function validateCommand(
        prefix: string,
        message: any,
        name: any,
        IsActivated: boolean,
        Args: {
            Alternative: boolean;
            requiredRoles: string[];
            requiredPerms: string[];
        },
        Perms: {
            Alternative: boolean;
            requiredRoles: string[];
            requiredPerms: string[];
        },
        expectedArgs: null | string
    ): Promise<boolean>;
}