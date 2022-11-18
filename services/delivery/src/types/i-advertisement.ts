import { IAdvertisementData } from './i-advertiment-data';

export interface IAdvertisement extends IAdvertisementData {
    _id: string;
    userId: string;
    createAt: Date;
    updateAt: Date;
    tags?: string[];
    isDelete: boolean
}
