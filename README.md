# **Discord.js_cmds**
This package helps you create discord.js commands more easily.

## **Install:**
From NPM: ```npm i @flamesx_128/discord.js_cmds```
From GitHub:
- Open a terminal and add: ```git clone https://github.com/FlamesX-128/Discord.js_cmds```
- Open a terminal in the file.
- Convert files to JS.
- Add files in node_modules.

### **Example TypeScript:**

```TypeScript
//src/index.ts
import { Client } from 'discord.js';
import { readFiles, readCommand } from '@flamesx_128/discord.js_cmds';
const client = new Client();
const prefix = '!>';

client.on('ready', () => {
	readFiles(__dirname, 'commands'); // You must put the name of the folder where the commands are.
	console.log('Bot Ready!');
});

client.on('message', (message: any) => {
	readCommand(prefix, message);
});

client.login('SECRET TOKEN');
```

```TypeScript
//src/commands/cmdPing.ts
import { commandBase } from '@flamesx\_128/discord.js\_cmds'
module.exports = new class cmdPing extends commandBase {
	constructor() {
		super();
		this.name = {
			command: 'ping',
			aliases: ['pi']
		};
		this.category = ['misc'];
		this.IsActivated = true;
	};
		
	async execute(message: any) {
		message.channel.send('Pong!');
	};
};
```

** Plans: ** 
- Add help and info command.
- Improve role and permission identifiers.
