import { EventEmitter } from 'node:events';
import { Schema, model } from 'mongoose';
import { Message, Messages } from './message';
import { TSendMessageData } from '../types/t-send-message-data';
import e from 'express';

class ChatEmiter extends EventEmitter { }
export const chatEmiter = new ChatEmiter();

/* 
Название	Тип	                    Обязательное	Уникальное
_id	        ObjectId	            да	            да
users	    [ObjectId, ObjectId]	да	            нет
createdAt	Date	                да	            нет
messages	Message[]	            нет	            нет 
*/

const chatSchema = new Schema({
    users: {
        type: [Schema.Types.ObjectId, Schema.Types.ObjectId],
        required: true,
    },

    createAt: {
        type: Date,
        required: true,
    },

    messages: {
        type: [Message],
    },

});

export const Chats = model('Chats', chatSchema);

export const Chat = {
    find: async function (usersArr: [string, string]) {
        const chat = await Chats.findOne({ users: { $all: usersArr } });
        return chat;
    },

    sendMessage: async function (data: TSendMessageData) {
        const { author, receiver, text } = data;
        const users: [string, string] = [author, receiver];
        const chat = await Chat.find([...users]);
        const newMessage = await Messages.create({
            text,
            author,
            sentAt: new Date,
        });
        if (!chat) {
            const newChat = await Chats.create({ users, createAt: new Date() });

            const updateChat = await Chats.findOneAndUpdate(
                newChat._id,
                { messages: [...newChat.messages, newMessage] },
            );
            if (updateChat)
                return { message: newMessage, chatId: newChat._id };
            return null;
        } else {
            const updateChat = await Chats.findOneAndUpdate(
                chat._id,
                { messages: [...chat.messages, newMessage] },
            );
            if (updateChat)
                return { message: newMessage, chatId: chat._id };
            return null;
        }
    },

    subscribe: function (cb: (data: any) => void) {
        chatEmiter.on('sendMessage', (data: TSendMessageData) => {
            const handler = async () => {
                const message = await Chat.sendMessage(data);
                cb(message);
            };
            handler().catch(err => console.log(err));
        });
    },

    getHistory: async function (chatId : string ) {
        const chat = await Chats.findById(chatId);
        
        if (chat) {
            const { messages } = chat;
            return [...messages];
        }
        
        return chat;
    },
};
