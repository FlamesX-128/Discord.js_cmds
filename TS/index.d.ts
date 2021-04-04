declare module '@flamesx_128/discord.js_cmds' {

/*=====================================================================================================
        VALIDATE PERMISSIONS AND ROLS
=====================================================================================================*/

    export function checkPermissions(
        message: any, 
        Perms: any
    ): boolean;

    export function checkPerms(
        message: any,
        Alternative: boolean, 
        requiredPerms: string | string[], 
        requiredRoles: string | string[],
        checkAlter?: boolean
    ): boolean;

    export function checkRoles(
        message: any,
        Alternative: boolean, 
        requiredPerms: string | string[], 
        requiredRoles: string | string[],
        checkAlter?: boolean
    ): boolean;

    export function validatePermissions(
        permissions: string[]
    ): boolean;

    export function validateArgs(
        message: any, 
        Args: any,
        prefix: string,
        command: string,
        expectedArgs: string
    ): boolean;

/*=====================================================================================================
        COMMAND BASE
=====================================================================================================*/

    export class commandBase {
    public command: string
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

    public constructor();
    public checkCommand(prefix: string, message: any): null;
    protected execute(message: any): any
    }

/*=====================================================================================================
        READ COMMAND
=====================================================================================================*/

    export function readCommand(
        prefix: string, 
        message: any, 
        commandList: any
    ): any;

/*=====================================================================================================
        VALIDATE COMMAND
=====================================================================================================*/

    export function validateCommand( 
        prefix: string,
        message: any,
        command: string,
        IsActivated: boolean,
        Args: {
            requiredOne: boolean;
            minArgsOne: number;
            maxArgsOne: null | number;
            requiredTwo: boolean;
            minArgsTwo: number;
            maxArgsTwo: null | number;
            requiredTree: boolean;
            minArgsTree: number;
            maxArgsTree: null | number;
        },
        Perms: {
            Alternative: boolean;
            requiredRoles: string | string[];
            requiredPerms: string | string[];
        },
        expectedArgs: null | string
    ): boolean;

}