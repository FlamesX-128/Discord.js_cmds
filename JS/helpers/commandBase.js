"use strict";
class commandBase {
    constructor() {
        this.command = {
            command: 'undefined',
            aliases: null,
            prefix: '!>'
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
                requiredRoles: null,
                requiredPerms: null
            },
            this.expectedArgs = null;
    }
    ;
    validCmd() {
    }
}
;
