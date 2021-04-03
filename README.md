# **discord.js_cmds**
## **English:**
### **This package supports javascript.** 
#### **Example TS:**

```Typescript
//TypeScript - src/index.ts
import { Client } from 'discord.js'; 
const client = new Client();

import { prefix } from './config.json';
import { ping } from './commands/ping'
import { readCommand } from '@flamesx_128/discord.js_cmds' //This package

//Register commands
const commandList = {
    "ping": { //command
        "checkCommand": (prefix: any, message: any) => { ping.checkCommand(prefix, message) } //call command
    }
};

client.on('ready', () => {
    console.log('Bot ready!');
});

client.on('message', (message: any) => {
    readCommand(prefix, message, commandList); //determine command, validate and execute.
});

client.login('TOKEN');
```

```TypeScript
//Typescript - src/commands/ping.ts
//command base
import { commandBase } from '@flamesx_128/discord.js_cmds'

export const ping = new class cmdPing extends commandBase {
    constructor() {
        super();
        // valores del comando
        this.command = 'ping'
        this.category = 'misc';
        this.IsActivated = true;
        this.Perms = {
            Alternative: false,
            requiredRoles: ['Moderator'],
            requiredPerms: ['ADMINISTRATOR']
        }
    }

    async execute(message: any)  {
        //Your code that you want me to execute.
        message.channel.send('Pong!')
    }
}
```

##### **Version: Beta 1.0.0**
- It is planned to add a command autoloader 
- Errors found: 0