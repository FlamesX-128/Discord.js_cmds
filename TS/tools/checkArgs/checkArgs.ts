import { TypeArgs } from "../../interfaces/cmdBase";

export async function checkArgs(
    message: any,
    args: string[],
    Args: TypeArgs
): Promise<boolean> {
    const expectedArgs = Args.expectedArgs;
    const ErrorSyntax = (): void => {
        if (Args.argsError !== null && Args.NotMoreArgs === true) {
            message.reply(`Incorrect requested arguments!\nArguments entered:  ${args.length} of ${Args.numberOfArgs}!\nExpected arguments: ${Args.argsError}`);
        } else if (Args.argsError === null && Args.NotMoreArgs === true) {
            message.reply(`Incorrect requested arguments!\nArguments entered:  ${args.length} of ${Args.numberOfArgs}!`);
        } else if (Args.argsError !== null && Args.NotMoreArgs === false) {
            message.reply(`Incorrect requested arguments!\nExpected arguments: ${Args.argsError}`);
        } else {
            message.reply(`Incorrect requested arguments!`);
        };
    };

    if (Args.numberOfArgs !== null && Args.numberOfArgs > 0) {
        for (let i = 0; i < Args.numberOfArgs; i++) {
            if (expectedArgs !== null) {
                if (!expectedArgs.length) throw new Error('You activated the expected arguments, but they have no content');
                if (expectedArgs.length < Args.numberOfArgs) throw new Error('The number of expected arguments is less than the number of required arguments');
                if (expectedArgs.length > Args.numberOfArgs) throw new Error('The number of expected arguments is greater than the number of required arguments');
                if (!args.length || (args.length < Args.numberOfArgs)) {
                    ErrorSyntax();
                    return false;
                } else if (Args.NotMoreArgs == true) {
                    if (args.length > Args.numberOfArgs) {
                        ErrorSyntax();
                        return false;
                    };
                };

                if (expectedArgs[i] == "ROLE") {
                    const RoleMention = await message.mentions.roles?.first()?.id;
                    const RoleID = await message.guild?.roles.cache.find((r: any) => r.id == args[i]);

                    if (RoleMention) {
                        if (args[i] !== `<@&${RoleMention}>`) {
                            ErrorSyntax();
                            return false;
                        };
                    } else if (!RoleID) {
                        ErrorSyntax();
                        return false;
                    };

                } else if (expectedArgs[i] == "USER") {
                    const UserMention = await message.mentions.members?.first()?.id;
                    const RoleID = await message.guild?.members.cache.find((m: any) => m.id === args[i]);

                    if (UserMention) {
                        if (args[i] !== `<@!${UserMention}>`) {
                            ErrorSyntax();
                            return false;
                        };
                    } else if (!RoleID) {
                        ErrorSyntax();
                        return false;
                    };

                } else if (expectedArgs[i] == "TEXT") {
                    if ((Args.minArgs !== null && args[i].length < Args.minArgs) || (Args.maxArgs !== null && args[i].length > Args.maxArgs)) {
                        ErrorSyntax();
                        return false;
                    };

                } else {
                    throw new Error(`No valid argument found: ${expectedArgs[i]}`);
                };

            } else {
                if ((Args.minArgs !== null && args[i].length < Args.minArgs) || (Args.maxArgs !== null && args[i].length > Args.maxArgs)) {
                    ErrorSyntax();
                    return false;
                };
            };
        };
    };
    return true;
};