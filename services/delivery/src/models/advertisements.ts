import { Schema, model } from 'mongoose';
import { IAdvertisementData } from '../types/i-advertiment-data';

/* 
    Название	Тип	        Обязательное	Уникальное
    _id	        ObjectId	да	            да
    shortText	string	    да	            нет
    description	string	    нет	            нет
    images	    string[]	нет	            нет
    userId	    ObjectId	да	            нет
    createdAt	Date	    да	            нет
    updatedAt	Date	    да	            нет
    tags	    string[]	нет	            нет
    isDeleted	boolean	    да	            нет 
*/

const advertisementSchema = new Schema({
    shortText: {
        type: String,
        required: true,
    },

    description: {
        type: String,
    },

    images: {
        type: [String],
    },

    userId: Schema.Types.ObjectId,

    createAt: {
        type: Date,
        required: true,
    },

    updateAt: {
        type: Date,
        required: true,
    },

    tags: {
        type: [String],
    },

    isDeleted: {
        type: Boolean,
        required: true,

    },
});


export const Advertisements = model('Advertisements', advertisementSchema);

export const AdvertisementModule = {
    create: async function (advertisementData: IAdvertisementData & { userId: string }) {
        const date = new Date();
        const [createAt, updateAt] = [date, date];
        console.log(advertisementData);
        const newAdvertisement = await Advertisements.create({ 
            ...advertisementData, createAt, updateAt, isDeleted: false,
        });
        return newAdvertisement;
    },

};
