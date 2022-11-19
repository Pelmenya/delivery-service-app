import { NextFunction, Request, Response } from 'express';
import { AdvertisementModule, Advertisements } from '../models/advertisements';
import { IAdvertisementData } from '../types/i-advertisement-data';
import { IUser } from '../types/i-user';
import { TQueryAdvertisementsParams } from '../types/t-query-advertisements-params';
import { publicFilesDir } from '../utils/constants/constants';
import { ERRORS } from '../utils/constants/errors';
import { BadRequestError } from '../utils/errors-classes/bad-request-error';
import { ForbiddenError } from '../utils/errors-classes/forbidden-error';

export const createAdvertisement = (req: Request, res: Response, next: NextFunction) => {
    const handler = async () => {
        const user = req.user as IUser;

        const imagesPath: string[] = [];
        const files = req.files as { images: Express.Multer.File[] };

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

export const getAdvertisements = (req: Request, res: Response, next: NextFunction) => {
    const handler = async () => {
        const params = req.query as TQueryAdvertisementsParams;

        const advertisements = await AdvertisementModule.find(params);

        res.status(200);
        res.json(advertisements);

    };

    handler().catch(next);
};

export const deleteAdvertisement = (req: Request, res: Response, next: NextFunction) => {
    const handler = async () => {
        const { id } = req.params;
        const user = req.user as IUser;
        const advertisement = await Advertisements.findById(id);
        if (String(advertisement?.userId) === String(user._id)) {
            const deletedAdvertisement = await AdvertisementModule.remove(id);
            if (deletedAdvertisement) {
                res.status(200);
                res.json({
                    data: {
                        id: deletedAdvertisement._id,
                        shortText: deletedAdvertisement.shortText,
                        description: deletedAdvertisement.description,
                        images: deletedAdvertisement.images,
                        tags: deletedAdvertisement.tags,
                        user: {
                            id: user._id,
                            name: user.name,
                        },
                        createAt: deletedAdvertisement.createAt,
                    },
                    status: 'ok',
                });
            }
        } else {
            throw new ForbiddenError(ERRORS.NOT_ACCESS);
        }
    };

    handler().catch(next);
};

export const getAdvertisement = (req: Request, res: Response, next: NextFunction) => {
    const handler = async () => {
        const { id } = req.params;
        const advertisement = await Advertisements.findById(id);

        if (advertisement?.isDeleted) {
            throw new BadRequestError(ERRORS.BAD_RESOURCE);
        } else {
            if (advertisement) {
                res.status(200);
                res.json({
                    data: {
                        id: advertisement._id,
                        shortText: advertisement.shortText,
                        description: advertisement.description,
                        images: advertisement.images,
                        tags: advertisement.tags,
                        userId: advertisement.userId,
                        createAt: advertisement.createAt,
                    },
                    status: 'ok',
                });
            } else throw new BadRequestError(ERRORS.BAD_RESOURCE);
        }
    };

    handler().catch(next);
};