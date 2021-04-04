# **Discord.js_cmds**
## **English**
This package helps you create discord.js commands more easily, it includes:

### **command Base:**
```TypeScript
public command       :  string
public category      :  null     |  string   |  string[]
public IsActivated   :  boolean
public Args: {
	requiredOne      :  boolean  
	minArgsOne       :  number   
	maxArgsOne       :  null     |  number
	requiredTwo      :  boolean  
	minArgsTwo       :  number   
	maxArgsTwo       :  null     |  number
	requiredThree    :  boolean  
	minArgsThree     :  number   ;
	maxArgsThree     :  null     |  number
}
public Perms: {
	Alternative      :  boolean  
	requiredRoles    :  string   |  string[]
	requiredPerms    :  string   |  string[]
}
public expectedArgs  :  null     |  string
```

### **Functions:**
#### **readCommand:**
```TypeScript
async readCommand(
	prefix       :  string
	message      :  any
	commandList  :  any
	): Promise <void>
```

#### **checkCommand:**
```TypeScript
async checkCommand(
	prefix   :  string
	message  :  any
	): Promise <boolean>
```

#### **validateCommand:**
```TypeScript
async validateCommand(
	prefix             :  string
	message            :  any
	command            :  string
	IsActivated        :  boolean
	Args: {
		requiredOne    :  boolean
		minArgsOne     :  number
		maxArgsOne     :  null     |  number
		requiredTwo    :  boolean
		minArgsTwo     :  number
		maxArgsTwo     :  null     |  number
		requiredTree   :  boolean
		minArgsTree    :  number
		maxArgsTree    :  null     |  number
	},
	Perms: {
		Alternative    :  boolean
		requiredRoles  :  string   |  string[]
		requiredPerms  :  string   |  string[]
	},
	expectedArgs       :  null     |  string
	): Promise <boolean>
```

#### **checkPermissions:**
```TypeScript
async checkPermissions(
	message  :  any
	Perms    :  any
	): Promise <boolean>
```

#### **validatePermissions:**
```TypeScript
validatePermissions = async (
	permissions  :  string[]
	): Promise <boolean>
```

#### **checkPerms:**
```TypeScript
async checkPerms(
	message        :  any
	Alternative    :  boolean
	requiredPerms  :  string   |  string[]
	requiredRoles  :  string   |  string[]
	checkAlter     :  boolean
	): Promise <boolean>
```

#### **CheckRoles:**
```TypeScript
async checkRoles(
	message        :  any
	Alternative    :  boolean
	requiredPerms  :  string   |  string[]
	requiredRoles  :  string   |  string[]
	checkAlter     :  boolean  
	): Promise <boolean>
```

#### **ValidateArgs:**
```TypeScript
async validateArgs(
	message       :  any
	Args          :  any
	prefix        :  string
	command       :  string
	expectedArgs  :  null    |  string
	): Promise <boolean>
```

#### **execute:**
```TypeScript
async execute(
	message  :  any
 )
 ```
 
 #### **Example:**
 ```Typescript
//TypeScript - src/index.ts
import { Client } from 'discord.js'; 
const client = new Client();

import { prefix } from './config.json';
import { ping } from './commands/ping'
import { readCommand } from '@flamesx_128/discord.js_cmds' // This module.

// Register commands.
const commandList = {
    "ping": { // Command name
        "checkCommand": (prefix: any, message: any) => { ping.checkCommand(prefix, message) } // Function to call the command.
    }
};

client.on('ready', () => {
    console.log('Bot ready!');
});

client.on('message', (message: any) => {
	if (message.author.bot) return;
    readCommand(prefix, message, commandList); // Validate command.
});

client.login('SECRET TOKEN');
```

```TypeScript
//Typescript - src/commands/ping.ts
// Import command base.
import { commandBase } from '@flamesx_128/discord.js_cmds'

// You command.
export const ping = new class cmdPing extends commandBase {
    constructor() {
        super();
        // Command values
        this.command = 'ping'
        this.category = 'misc';
        this.IsActivated = true;
    }
	
	// Actions you take after verifying and validating the requirements.
    async execute(message: any) {
        message.channel.send('Pong!')
    }
}
```

** Plans: ** 
- Add automatic command reader.
- Improve the validation of arguments. 
- Add help and information for the default command. 
- Optimize the code.

# <-------------------------------------->

## **Español**
Este paquete te ayuda a la creacion de comandos en discord.js mas facil, incluye:

### **Base de los comandos:**
```TypeScript
public command       :  string
public category      :  null     |  string   |  string[]
public IsActivated   :  boolean
public Args: {
	requiredOne      :  boolean  
	minArgsOne       :  number   
	maxArgsOne       :  null     |  number
	requiredTwo      :  boolean  
	minArgsTwo       :  number   
	maxArgsTwo       :  null     |  number
	requiredThree    :  boolean  
	minArgsThree     :  number   ;
	maxArgsThree     :  null     |  number
}
public Perms: {
	Alternative      :  boolean  
	requiredRoles    :  string   |  string[]
	requiredPerms    :  string   |  string[]
}
public expectedArgs  :  null     |  string
```

### **Funciones:**
#### **readCommand:**
```TypeScript
async readCommand(
	prefix       :  string
	message      :  any
	commandList  :  any
	): Promise <void>
```

#### **checkCommand:**
```TypeScript
async checkCommand(
	prefix   :  string
	message  :  any
	): Promise <boolean>
```

#### **validateCommand:**
```TypeScript
async validateCommand(
	prefix             :  string
	message            :  any
	command            :  string
	IsActivated        :  boolean
	Args: {
		requiredOne    :  boolean
		minArgsOne     :  number
		maxArgsOne     :  null     |  number
		requiredTwo    :  boolean
		minArgsTwo     :  number
		maxArgsTwo     :  null     |  number
		requiredTree   :  boolean
		minArgsTree    :  number
		maxArgsTree    :  null     |  number
	},
	Perms: {
		Alternative    :  boolean
		requiredRoles  :  string   |  string[]
		requiredPerms  :  string   |  string[]
	},
	expectedArgs       :  null     |  string
	): Promise <boolean>
```

#### **checkPermissions:**
```TypeScript
async checkPermissions(
	message  :  any
	Perms    :  any
	): Promise <boolean>
```

#### **validatePermissions:**
```TypeScript
validatePermissions = async (
	permissions  :  string[]
	): Promise <boolean>
```

#### **checkPerms:**
```TypeScript
async checkPerms(
	message        :  any
	Alternative    :  boolean
	requiredPerms  :  string   |  string[]
	requiredRoles  :  string   |  string[]
	checkAlter     :  boolean
	): Promise <boolean>
```

#### **CheckRoles:**
```TypeScript
async checkRoles(
	message        :  any
	Alternative    :  boolean
	requiredPerms  :  string   |  string[]
	requiredRoles  :  string   |  string[]
	checkAlter     :  boolean  
	): Promise <boolean>
```

#### **ValidateArgs:**
```TypeScript
async validateArgs(
	message       :  any
	Args          :  any
	prefix        :  string
	command       :  string
	expectedArgs  :  null    |  string
	): Promise <boolean>
```

#### **execute:**
```TypeScript
async execute(
	message  :  any
 )
 ```
 
 #### **Ejemplo:**
 ```Typescript
//TypeScript - src/index.ts
import { Client } from 'discord.js'; 
const client = new Client();

import { prefix } from './config.json';
import { ping } from './commands/ping'
import { readCommand } from '@flamesx_128/discord.js_cmds' //Este modulo.

// Registrar comandos.
const commandList = {
    "ping": { //nombre del comando
        "checkCommand": (prefix: any, message: any) => { ping.checkCommand(prefix, message) } // Funcion para llamar el comando.
    }
};

client.on('ready', () => {
    console.log('Bot ready!');
});

client.on('message', (message: any) => {
	if (message.author.bot) return;
    readCommand(prefix, message, commandList); // Validar comando.
});

client.login('TOKEN SECRETO');
```

```TypeScript
//Typescript - src/commands/ping.ts
// Importar base de los comandos.
import { commandBase } from '@flamesx_128/discord.js_cmds'

// Tu comando.
export const ping = new class cmdPing extends commandBase {
    constructor() {
        super();
        // valores del comando
        this.command = 'ping'
        this.category = 'misc';
        this.IsActivated = true;
    }
	
	// Acciones que realizara despues de verificar y validar requirimientos.
    async execute(message: any) {
        message.channel.send('Pong!')
    }
}
```

**Planes:**
- Añadir lector automatico de comandos.
- Mejorar la validacion de argumentos.
- Agregar comando por defecto help y info.
- Optimizar el codigo.