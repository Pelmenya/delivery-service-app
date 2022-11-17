import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '../types/i-user';

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




userSchema.statics.findByEmail = function (email: string) {
    const user: IUser = this.find({ email });
    return user;
};


export const Users = model('Users', userSchema);

const UserModule = {
    create: async function ( user: IUser) {
        const { password } = user;
        const hash = await bcrypt.hash(password, 10);
        const newUser = await Users.create({ ...user, passwordHash: hash });
        return newUser;
    },
};

export { UserModule };