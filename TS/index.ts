export async function readCommand(prefix: string, message: any, commandList: any) {
    const {content} = message;
    const args = content.split(/[ ]+/);
    const command = args[0].split(prefix);
    command.shift();
    args.shift();

    commandList[command].execute(prefix, message)
}