# **Discord.js_cmds v2.2.0**
This package helps you create discord.js commands more easily.

## **Features:**
- Fixed an issue that prevented the use of multiple commands.

### **Install:**
From NPM: ```npm i @flamesx_128/discord.js_cmds``` <br>
From GitHub:
- Open a terminal and add: ```git clone https://github.com/FlamesX-128/Discord.js_cmds```
- Open a terminal in the file.
- Convert files to JS.
- Add files in node_modules.

#### **Example TypeScript:**

```TypeScript
//FILE = src/index.ts
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
//FILE = src/commands/cmdPing.ts
import { commandBase } from '@flamesx_128/discord.js\_cmds'
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
