export interface IMessage {
    _id: string;
    author: string;
    sentAt: Date;
    text: string;
    readAt?: Date;
}