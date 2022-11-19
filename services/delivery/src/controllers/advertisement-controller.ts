import { NextFunction, Request, Response } from 'express';
import { AdvertisementModule } from '../models/advertisements';
import { IAdvertisementData } from '../types/i-advertisement-data';
import { IUser } from '../types/i-user';
import { TQueryAdvertisementsParams } from '../types/t-query-advertisements-params';
import { publicFilesDir } from '../utils/constants/constants';

export const createAdvertisement = (req: Request, res: Response, next: NextFunction) => {
    const handler = async () => {
        const user  = req.user as IUser;

        const imagesPath: string[] = [];
        const  files = req.files as { images: Express.Multer.File[] };
        
        if (files.images) {
            files.images.forEach(image => {
                imagesPath.push(`${publicFilesDir}/${String(user._id)}/${image.filename}`);
            });
        }

        const dataAdvertisement = {
            ...req.body as IAdvertisementData,
            userId: user._id,
            images: [...imagesPath],
        };
        
        const newAdvertisement = await AdvertisementModule.create(dataAdvertisement);
        res.status(201);
        res.json({
            data: {
                id: newAdvertisement._id,
                shortText: newAdvertisement.shortText,
                description: newAdvertisement.description,
                images: newAdvertisement.images,
                tags: newAdvertisement.tags,
                user: { 
                    id: user._id,
                    name: user.name,
                },
                createAt: newAdvertisement.createAt,
            },
            status: 'ok',
        });
    };

    handler().catch(next);
};

export const getAdvertisements = (req: Request, res: Response, next: NextFunction ) => {
    const handler = async () => {
        const params = req.query as TQueryAdvertisementsParams;

        const advertisements = await AdvertisementModule.find(params);
        
        res.status(200);
        res.json(advertisements);

    };

    handler().catch(next);
};
