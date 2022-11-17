import { UserModule, Users } from '../models/users';
import bcrypt from 'bcrypt';
import passport from 'passport';

import { Strategy as LocalStrategy, VerifyFunction } from 'passport-local';
import { IUser } from '../types/i-user';

const options = {
    usernameField: 'email',
    passwordField: 'password',
};

const verify: VerifyFunction = (email, password, done) => {
    const handler = async () => {
        await UserModule.findByEmail(email, (err: Error, user: IUser) => {
            console.log(err);
            console.log(user);
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            if (bcrypt.compareSync(password, user.passwordHash)) {
                return done(null, user);
            }
            return done(new Error('Password or login is not correct'));
        });

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