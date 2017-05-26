import { Version } from './Version';

export class Message {
    constructor(
        private command: string,
        private room: string,
        private version = new Version(1, 0),
        private data = { }
        ) { }

    public getCommand(): string {
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

    public serialize(): object {
        return {
            command: this.command,
            room: this.room,
            version: this.version,
            data: this.data,
        };
    }

    public static deserialize(raw: object): Message {
        if (!raw.hasOwnProperty('command'))
            throw Error('Missing property \'command\' in message');

        if (!raw.hasOwnProperty('room'))
            throw Error('Missing property \'room\' in message');

        if (!raw.hasOwnProperty('version'))
            throw Error('Missing property \'version\' in message');

        if (!raw.hasOwnProperty('data'))
            throw Error('Missing property \'data\' in message');

        const tmp: any = raw;

        return new Message(tmp.command, tmp.room, tmp.version, tmp.data);
    }
}

