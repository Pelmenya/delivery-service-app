import { IAdvertisementData } from './i-advertisement-data';

export interface IAdvertisement extends IAdvertisementData {
    _id: string;
    userId: string;
    createAt: Date;
    updateAt: Date;
    isDelete: boolean
}
