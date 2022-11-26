
export type TQueryAdvertisementsParams = {
    shortText?: string | { $regex: string  };
    description?: string | { $regex: string };
    userId?:string | { $eq: string };
    tags?: string | { $all: string[] };
    isDeleted?: boolean;
};