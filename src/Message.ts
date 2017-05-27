import { Version } from './Version';
import { Command } from './Command';

export class Message {
    constructor(
        private command: Command,
        private room: string,
        private version = new Version(1, 0),
        private data = { }
        ) { }

    public getCommand(): Command {
        return this.command;
    }

    public getRoom(): string {
        return this.room;
    }

    public setVersion(version: Version) {
        this.version = version;
    }

    public getVersion(): Version {
        return this.version;
    }

    public setData(data: object) {
        this.data = data;
    }

    public getData(): object {
        return this.data;
    }

    public isAnswer(): boolean {
        return this.command === Command.ACK || this.command === Command.NAK;
    }

    public serialize(): object {
        return {
            command: Command[this.command],
            room: this.room,
            version: this.version,
            data: this.data,
        };
    }

    public static deserialize(raw: object): Message {
        const tmp: any = raw;

        if (!tmp.hasOwnProperty('command'))
            throw Error('Missing property \'command\' in message');

        if (!tmp.hasOwnProperty('room'))
            throw Error('Missing property \'room\' in message');

        if (!tmp.hasOwnProperty('version'))
            throw Error('Missing property \'version\' in message');

        if (!tmp.hasOwnProperty('data'))
            throw Error('Missing property \'data\' in message');

        switch (tmp.command) {
            case Command[Command.POST]: return new Message(Command.POST, tmp.room, tmp.version, tmp.data);
            case Command[Command.GET]: return new Message(Command.GET, tmp.room, tmp.version, tmp.data);
            case Command[Command.ACK]: return new Message(Command.ACK, tmp.room, tmp.version, tmp.data);
            case Command[Command.NAK]: return new Message(Command.NAK, tmp.room, tmp.version, tmp.data);
            case Command[Command.NOTIFICATION]: return new Message(Command.NOTIFICATION, tmp.room, tmp.version, tmp.data);
            default: throw new Error(`Unknown command: ${tmp.command}`);
        }
    }
}

