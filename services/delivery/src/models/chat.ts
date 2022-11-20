import { Schema, model } from 'mongoose';
import { IMessage } from '../types/i-message';
import { Message, messageShema } from './message';
 

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
        requred: true,
    },
    
    createAt: {
        type: Date,
        requred: true,
    },

    messages: {
        type: [Message],
    },

});

export const Chats = model('Chats', chatSchema);