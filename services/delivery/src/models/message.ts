import { Schema, model } from 'mongoose';


/* 
Название	Тип	        Обязательное	Уникальное
_id	        ObjectId	да	            да
author	    ObjectId	да	            нет
sentAt	    Date	    да	            нет
text	    string	    да	            нет
readAt	    Date	    нет	            нет 
*/

export const Message = {
    author: {
        type: Schema.Types.ObjectId,
        required: true,
    },

    sentAt: {
        type: Date,
        required: true,
    },

    text: {
        type: String,
        required: true,
    },
    
    readAt: {
        type: String,
    },
};

export const messageShema = new Schema({
    ...Message,    
});