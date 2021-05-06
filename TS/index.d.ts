declare module '@flamesx_128/discord.js_cmds' {

    /*=====================================================================================================
            COMMAND BASE
    =====================================================================================================*/

    export class commandBase {
        /**
         * @description - Specify validation of command
         * @param {string} [string] - Name of the command to be executed.
         * @param {null | string[]} [aliases] - Alternative names of the command to run.
         * @param {null | string[]} [category] - Command category.
         * @param {boolean} [activated] - The command will be executed if true.
         */
        Command: TypeCommand;

        /**
         * @interface [TypeArgs]
         * @description - Specify validation of arguments
         * @param {null | string[]} [expectedArgs] - Argument type to send.
         * @param {null | number} [numberOfArgs] - Number of arguments.
         * @param {boolean} [NotMoreArgs] - The command is not executed if the arguments are greater than those requested.
         * @param {null | string} [argsError] - Parameters of the arguments to send if there is an error.
         * @param {null | number} [minArgs] - Minimum number of arguments.
         * @param {null | number} [maxArgs] - Maximum number of arguments.
         */
        Args: TypeArgs;

        /**
         * @description - Specify validation of permissions
         * @param {boolean} [alternative] - It will find if a user has the roles or the permissions.
         * @param {null | string[]} [requiredRoles] - Required roles to run the commando.
         * @param {null | string[]} [requiredPerms] - Required permissions to run the commando.
         */
        Perms: TypePerms;

        constructor();
        /**
         * @description - Validate permissions and arguments.
         * @param {string} [prefix] - Prefix that calls the bot.
         * @param {any | Message} [message] - Message from discord.
         * @param {string[]} [args] - Message arguments.
         */

        checkCommand(prefix: string, message: any, args: string[]): Promise<void>;
        /**
         * @description - This runs after commands validation.
         * @param {string} [prefix] - Prefix that calls the bot.
         * @param {any | Message} [message] - Message from discord.
         * @param {string[]} [args] - Message arguments.
         */
        execute(prefix: string, message: any, args: string[]): Promise<void>;
    }

    /*=====================================================================================================
            INTERFACES
    =====================================================================================================*/

    /**
     * @description - Command Interface
     * @param {string} [string] - Name of the command to be executed.
     * @param {null | string[]} [aliases] - Alternative names of the command to run.
     * @param {null | string[]} [category] - Command category.
     * @param {boolean} [activated] - The command will be executed if true.
     */
    export interface TypeCommand {
        name: string,
        aliases: null | string[],
        category: null | string[],
        activated: boolean;
    }

    /**
     * @description - Arguments interface
     * @param {null | string[]} [expectedArgs] - Argument type to send.
     * @param {null | number} [numberOfArgs] - Number of arguments.
     * @param {boolean} [NotMoreArgs] - The command is not executed if the arguments are greater than those requested.
     * @param {null | string} [argsError] - Parameters of the arguments to send if there is an error.
     * @param {null | number} [minArgs] - Minimum number of arguments.
     * @param {null | number} [maxArgs] - Maximum number of arguments.
     */
    export interface TypeArgs {
        expectedArgs: null | string[],
        numberOfArgs: null | number,
        NotMoreArgs: boolean,
        argsError: null | string,
        minArgs: null | number,
        maxArgs: null | number;
    }

    /**
     * @description - Permissions interface
     * @param {boolean} [alternative] - It will find if a user has the roles or the permissions.
     * @param {null | string[]} [requiredRoles] - Required roles to run the commando.
     * @param {null | string[]} [requiredPerms] - Required permissions to run the commando.
     */
    export interface TypePerms {
        alternative: boolean,
        requiredRoles: null | string[],
        requiredPerms: null | string[];
    }

    /*=====================================================================================================
            VALIDATE PERMISSIONS AND ROLS
    =====================================================================================================*/

    /**
     * @description - Check arguments
     * @param {any} [message] - Message from discord.
     * @param {string[]} [args] - Message argument.
     * @param {TypeArgs} [Args] - Arguments validation info.
     */
    export function checkArgs(
        message: any,
        args: string[],
        Args: TypeArgs
    ): Promise<boolean>;
    
    /**
     * @description - Validate permissions.
     * @param {string[]} [requiredPerms] - Required permissions.
     */
    export function validatePermissions(
        requiredPerms: string[]
    ): Promise<void>;

    /**
     * @description - Check permissions and roles.
     * @param message - Message from discord.
     * @param Perms - Permission validation info.
     */
    export function checkPermissions(
        message: any,
        Perms: TypePerms
    ): Promise<boolean>;

    /**
     * @description - Check user permissions.
     * @param message - Message from discord.
     * @param Perms - Permission validation info.
     * @param checkAlt - If alternative was already used.
     */
    export function checkPerms(
        message: any,
        Perms: TypePerms,
        checkAlt: boolean
    ): Promise<boolean>;


    /**
     * @description - Check user roles.
     * @param message - Message from discord.
     * @param Perms - Permission validation info.
     * @param checkAlter - If alternative was already used.
     */
    export function checkRoles(
        message: any,
        Perms: TypePerms,
        checkAlter: boolean
    ): Promise<boolean>;

    /*=====================================================================================================
            READ COMMANDS
    =====================================================================================================*/

    /**
     * @description - Detect command and execute validation.
     * @param prefix - Prefix that calls the bot.
     * @param message - Message from discord.
     */
    export function readCommands(
        prefix: string,
        message: any
    ): Promise<void>;

    /**
     * @description - Read files and save commands.
     * @param directory - Bot directory.
     * @param target - Command directory.
     */
    export function readFiles(
        directory: string,
        target: string
    ): Promise<void>;

    /*=====================================================================================================
            VALIDATE COMMAND
    =====================================================================================================*/

    /**
     * @description - Validates the command.
     * @param message - Message from discord.
     * @param args - Message arguments.
     * @param Command - Command validation info.
     * @param Args - Argument validation info.
     * @param Perms - Permission validation info.
     */
    export function validateCmds(
        message: any,
        args: string[],
        Command: TypeCommand,
        Args: TypeArgs,
        Perms: TypePerms
    ): Promise<boolean>;
}