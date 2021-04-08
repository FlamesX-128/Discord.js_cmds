export async function validateArgs(
    message: any,
    Args: any,
    prefix: string,
    name: any,
    expectedArgs: null | string
): Promise<boolean> {
    const { content } = message;

    try {
        if ((Args.numberOfArgs !== null && Args.numberOfArgs > 0)) {
            const args: any = await content.split(/[ ]+/);
            args.shift();

            for (let Case = 0; Case < Args.numberOfArgs; Case++) {
                if (args[Case].length < Args.minArgs || (Args.maxArgs !== null && args[Case].length > Args.maxArgs)) {
                    await message.reply(`Incorrect requested arguments! Use: ${prefix}${name.command} ${expectedArgs}`);
                    return false;
                };
            };
        };
    } catch {
        await message.reply(`Incorrect requested arguments! Use: ${prefix}${name.command} ${expectedArgs}`);
        return false;
    };

    return true;
};