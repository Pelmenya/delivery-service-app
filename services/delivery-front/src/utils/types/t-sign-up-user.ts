import { IUser } from './i-user';

export type TSignUpUser = Omit<Omit<IUser, '_id' >, 'passwordHash'>;
