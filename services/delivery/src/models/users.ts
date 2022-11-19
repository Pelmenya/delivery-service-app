import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '../types/i-user';
import { TSignUpUser } from '../types/t-sign-up-user';

/* 
    Название	    Тип	        Обязательное	Уникальное
    _id	            ObjectId	да	            да
    email	        string	    да	            да
    passwordHash	string	    да	            нет
    name	        string	    да	            нет
    contactPhone	string	    нет	            нет
*/

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    passwordHash: {
        type: String,
        required: true,
    },

    contactPhone: {
        type: String,
    },
});

export const Users = model('Users', userSchema);

export const UserModule = {
    create: async function (signUpData: TSignUpUser) {
        const { password } = signUpData;
        const hash = await bcrypt.hash(password, 10);
        const newUser = await Users.create({ ...signUpData, passwordHash: hash });
        return newUser;
    },

    findByEmail: async function (email: string, cb?: (err: Error, user: IUser) => void) {
        const user = cb ? await Users.findOne({ email }, cb).clone() : await Users.findOne({ email }).clone();
        return user;
    },  
};