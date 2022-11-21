import { Schema, model } from 'mongoose';
import { Message } from './message';
 

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