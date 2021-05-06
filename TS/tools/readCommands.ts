export const commands: any = [];

export async function readCommands(prefix: string, message: any): Promise<void> {
    const args = message.content.split(/[ ]+/);
    const command = args[0].split(`${prefix}`);
    command.shift();
    args.shift();

    try {
        commands.forEach((element: any) => {
            if (element.Command.name == command) {
                return element.checkCommand(prefix, message, args);

            } else {
                const alias = element.Command.aliases;

                if (alias) alias.forEach((Element: any) => {
                    if (Element == command) return element.checkCommand(prefix, message, args);
                });
            };
        });
    } catch (err) {
        console.log(err);
    };
};