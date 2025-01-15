import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import randomeBytes from 'crypto';

import UserCollection from '../db/models/User.js';
import SessionCollection from '../db/models/Session.js';
import {accessTokenLifetime, refreshTokenLifetime} from '../constants/users.js';

export const register = async payload => {
    const {email, password} = payload;
    const user = await UserCollection.findOne({email});
    if (user) {
        throw createHttpError(409, 'Email in use');
    }

    const hashPassword = await bcrypt.hash(password, 10);
    
    const newUser = await UserCollection.create({...payload, password: hashPassword});

    return newUser;
};

export const login = async ({email, password}) => {
    const user = await UserCollection.findOne({email});
    if (!user) {
        throw createHttpError(401, 'Invalid email or password');
    }

    const passwordCompear = await bcrypt.compare(password, user.password);
    if (!passwordCompear) {
        throw createHttpError(401, 'Invalid email or password');
    }

    await SessionCollection.deleteOne({userId: user._id});
    const accessToken = await randomeBytes(30).toString('base64');
    const refreshToken = await randomeBytes(30).toString('base64');
    return SessionCollection.create({
        userId: user._id,
        accessToken,   
        refreshToken,
        accessTokenValideUntil: new Date(Date.now() + accessTokenLifetime),
        refreshTokenValideUntil: new Date(Date.now() + refreshTokenLifetime),});
};