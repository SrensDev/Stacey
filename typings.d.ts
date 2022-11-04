import * as Discord from 'discord.js';

export interface LegacyCommand {
    name: string;
    aliases?: string[];
    description?: string;
    usage?: string;

    execute(message: Discord.Message & { client: Client }, args: string[]): void | Promise<void>;
}

export interface Client extends Discord.Client {
    commands: Discord.Collection<string, LegacyCommand>;
}