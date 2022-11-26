import { IMessage } from './i-message';

export interface IChat {
    _id: string;
    users: [string, string];
    createAt: Date;
    messages?: IMessage[];
}
