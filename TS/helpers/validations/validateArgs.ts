export async function validateArgs(
    message: any, 
    Args: any,
    prefix: string,
    command: string,
    expectedArgs: null | string
    ): Promise<boolean> {
        const { content } = message;

        if (Args.requiredOne == false && (Args.requiredTree == true || Args.requiredTwo == true)) {
            console.log(`The first argument are disabled, but argument second or three are enabled.`);
            return false;

        } else if (Args.requiredTwo == false && Args.requiredTree == true) {
            console.log(`The second argument are disabled, but argument three are enabled.`);
            return false;
        };

        const args: any = content.split(/[ ]+/);
        args.shift();
        
        try {
            if (Args.requiredOne == true) {
                if (args[0].length < Args.minArgsOne || (Args.maxArgsOne !== null && args[0].length > Args.maxArgsOne)) {
                    await message.reply(`Incorrect requested arguments! Use: ${prefix}${command} ${expectedArgs}`);
                    return false;
                };
        
            } 
            if (Args.requiredTwo == true) {
                if (args[1].length < Args.minArgsTwo || (Args.maxArgsTwo !== null && args[1].length > Args.maxArgsTwo)) {
                    await message.reply(`Incorrect requested arguments! Use: ${prefix}${command} ${expectedArgs}`);
                    return false;
                };
                
            } 
            if (Args.requiredTree == true) {
                if (args[2].length < Args.minArgsTree || (Args.maxArgsTree !== null && args[2].length > Args.maxArgsTree)) {
                    await message.reply(`Incorrect requested arguments! Use: ${prefix}${command} ${expectedArgs}`);
                    return false;
                };
            };

        } catch {
            await message.reply(`Incorrect requested arguments! Use: ${prefix}${command} ${expectedArgs}`);
            return false;
        };
        
        return true;
}