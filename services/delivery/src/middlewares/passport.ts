import { Users } from '../models/users';
import passport from 'passport';

import { Strategy as LocalStrategy, VerifyFunction } from 'passport-local';
import { IUser } from '../types/i-user';

const options = {
    usernameField: 'username',
    passwordField: 'password',
};

const verify: VerifyFunction = (username, password, done) => {
    const handler = async () => {
        await Users.findOne({ username },
            (err: Error, user: IUser) => {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }
                if (user.passwordHash === password) {
                    return done(null, user);
                } 
                return  done(new Error('Password or login is not correct'));
            }).clone();

    };
    handler().catch(err => console.log(err));
};


passport.use('local', new LocalStrategy(options, verify));

passport.serializeUser((_id, done) => {
    done(null, _id);
});

passport.deserializeUser((_id, done) => {
    const handler = async () => {
        const user = await Users.findById(_id);
        if (!user) {
            done(new Error(`Пользователь с ${String(_id)} не найден`));
        }
        return done(null, user);
    };

    handler().catch(err => console.log(err));
});


export { passport };