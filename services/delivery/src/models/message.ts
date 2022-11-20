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
        requred: true,
    },

    sentAt: {
        type: Date,
        requred: true,
    },

    text: {
        type: String,
        requred: true,
    },
    
    readAt: {
        type: String,
    },
};

export const messageShema = new Schema({
    ...Message,    
});