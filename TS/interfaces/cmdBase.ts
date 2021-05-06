export interface TypeCommand {
    name: string,
    aliases: null | string[],
    category: null | string[],
    activated: boolean;
};

export interface TypeArgs {
    expectedArgs: null | string[],
    numberOfArgs: null | number,
    NotMoreArgs: boolean,
    argsError: null | string,
    minArgs: null | number,
    maxArgs: null | number;
};

export interface TypePerms {
    alternative: boolean,
    requiredRoles: null | string[],
    requiredPerms: null | string[];
};