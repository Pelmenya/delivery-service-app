import { Schema, model, ObjectId } from 'mongoose';
import { IAdvertisementData } from '../types/i-advertisement-data';
import { TQueryAdvertisementsParams } from '../types/t-query-advertisements-params';

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
        const { tags } = advertisementData;
        let tagsArray: (string | undefined)[] | undefined;
        if (tags) {
            tagsArray = tags.split(',');
            tagsArray = tagsArray.map(word => { 
                if (word) return word.trim();
                return;            
            });
        }
        
        const newAdvertisement = await Advertisements.create({ 
            ...advertisementData, createAt, updateAt, isDeleted: false, tags: tagsArray,
        });
        return newAdvertisement;
    },
 
    find: async function (params:TQueryAdvertisementsParams) {
        const { shortText, description, tags, userId } = params;
        const queryParams: TQueryAdvertisementsParams = {};
        if (shortText) {
            queryParams.shortText = { $regex : shortText } as { '$regex': string  };
        }
        if (description) {
            queryParams.description = { $regex: description } as { '$regex': string  };
        }
        if (userId) {
            queryParams.userId = { $eq: userId } as { '$eq': string  };
        }
        if (tags && typeof tags === 'string') {
            let tagsArray: (string | undefined)[] | undefined;
            tagsArray = tags.split(',');
            tagsArray = tagsArray.map(word => { 
                if (word) return word.trim();
                return;            
            });
            queryParams.tags = { $all : tagsArray } as { $all: string[] };
        }

        queryParams.isDeleted = false;

        const advertisements = await Advertisements.find({ ...queryParams });
        return advertisements;
    },

    remove: async function (id: ObjectId | string ) {
        const advertisement = await Advertisements.findByIdAndUpdate({ _id: String(id) }, { isDeleted: true });
        return advertisement;
    },
};

