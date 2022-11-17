export interface IAdvertisement {
    _id: string;
    shortText: string;
    description?: string
    images?: string[];
    userId: string;
    createAt: Date;
    updateAt: Date;
    tags?: string[];
    isDelete: boolean
}
