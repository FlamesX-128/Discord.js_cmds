# **Discord.js_cmds v3.0.0**
## **This package works in JavaScript and TypeScript**

<h2><b>Places:</b></h2>
<h3><b>
	<a href="#FEATURES">Features</a> |
	<a href="#PARAMETERS">Parameters</a> |
	<a href="#EXAMPLES">Examples</a> |
    <a href="#INEED">I need...</a>
</b></h3><br>

<h2 id="FEATURES"><b>Features:</b></h2>

### **Added:**
+ Command interface.
+ Arguments interface.
+ Permissions interface.
+ Parameters.

### **Change:**
+ Element validator.
+ Argument validator.

### **Plans:**
+ Add cooldown in commands. 

<h2 id="PARAMETERS"><b>Parameters:</b></h2>

```TypeScript
function readCommands(
	//Prefix that calls the bot.
    prefix: string,

	//Message from discord.
    message: any
): Promise<void>; //Type of value returned.
```

```TypeScript
function readFiles(
	//Bot directory
    directory: string,

	//Command directory
    target: string
): Promise<void>; //Type of value returned.
```
<br>

### **This applies to the commandBase.**
```TypeScript
interface TypeCommand {
	//Name of the command to be executed.
    name: string, //Value to be received.

	//Alternative names of the command to run.
    aliases: null | string[], //Value to be received.

	//Command category.
    category: null | string[], //Value to be received.

	//The command will be executed if true.
    activated: boolean; //Value to be received.
}
```

```TypeScript
interface TypeArgs {
	//Argument type to send.
    expectedArgs: null | string[], //Value to be received.

	//Number of arguments.
    numberOfArgs: null | number, //Value to be received.

	//The command is not executed if the arguments are greater than those requested.
    NotMoreArgs: boolean, //Value to be received.

	//Parameters of the arguments to send if there is an error.
    argsError: null | string, //Value to be received.

	//Minimum number of arguments.
    minArgs: null | number, //Value to be received.

	//Maximum number of arguments.
    maxArgs: null | number; //Value to be received.
};
```

```TypeScript
interface TypePerms {
	//It will find if a user has the roles or the permissions.
    alternative: boolean, //Value to be received.

	//Required roles to run the commando.
    requiredRoles: null | string[], //Value to be received.

	//Required permissions to run the commando.
    requiredPerms: null | string[]; //Value to be received.
};
```

<h2 id="EXAMPLES"><b>Examples:</b></h2>

### **Example TS(TypeScript):**
#### **package.json**
```JSON
{
  "devDependencies": {
    "@types/node": "^14.14.37",
    "dotenv": "^8.2.0",
    "nodemon": "^2.0.7",
    "typescript": "^4.2.4"
  },
  "dependencies": {
    "@flamesx_128/discord.js_cmds": "^3.0.0",
    "discord.js": "^12.5.3"
  }
}
```

#### **TS/index.ts**
```TypeScript
import { config } from 'dotenv';
config();

import { readCommands, readFiles } from '@flamesx_128/discord.js_cmds';
import { Client, Message } from 'discord.js';
const client = new Client();
const prefix = "!";

client.on('ready', async () => {
    await readFiles(__dirname, 'commands');
    console.log('Bot ready!');
});

client.on('message', async (message: Message) => {
    if (message.author.bot) return;
    await readCommands(prefix, message);
});

client.login(process.env.BOT);
```

#### **TS/commands/cmdPing.ts**
```TypeScript
import { commandBase } from '@flamesx_128/discord.js_cmds';

module.exports = new class cmdPing extends commandBase {
    constructor() {
        super();
        this.Command = {
            name: 'ping',
            aliases: null,
            category: ['fun'],
            activated: true
        };
    };

    async execute(prefix: string, message: any, args: string[]) {
        message.reply(`Pong! \nAPI latency: ${message.client.ws.ping}ms.`);
    };
};
```

<br>

### **Example JS(JavaScript):**
#### **package.json**
```JSON
{
  "dependencies": {
    "@flamesx_128/discord.js_cmds": "^3.0.0",
    "discord.js": "^12.5.3"
  }
}
```

#### **index.js**
```JavaScript
const { readFiles, readCommands } = require('@flamesx_128/discord.js_cmds');
const { Client } = require("discord.js");
const client = new Client();
const prefix = "$";

client.on("ready", async () => {
    await readFiles(__dirname, "cmds");
});

client.on("message", async (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(!prefix)) return;

    await readCommands(prefix, message);
});

client.login("SECRET TOKEN");
```

#### **cmds/ping.js**
```JavaScript
const { commandBase } = require('@flamesx_128/discord.js_cmds');

module.exports = new class Ping extends commandBase {
    constructor(Command){
        super(Command);
        this.Command = {
            name: "ping",
            aliases: null,
            category: null,
            activated: true
        };
    };

    execute = (prefix, message, args) => {
        message.channel.send("Pong!");
    };
};
```

<h2><b>More Examples:</b></h2>
<h3>
<a href="https://github.com/FlamesX-128/Dagger">[Github/Dagger]</a>
</h3><br>

<h2 id="INEED"><b>I need...:</b></h2>

<h3>You can report a bug, request an improvement and/or give ideas here: <br>
<a href="https://github.com/FlamesX-128/Discord.js_cmds/issues">[Github/Discord.js_cmds/issues]</a>
</h3> <br>

<h3>If you need help you can go to my discord:</h3>

[![Discord](https://img.shields.io/discord/830185962360799262?color=7289da&logo=discord&logoColor=dark)](https://discord.gg/z3dATdqXWY)