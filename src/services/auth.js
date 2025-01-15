import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import randomeBytes from 'crypto';

import UserCollection from '../db/models/User.js';
import SessionCollection from '../db/models/Session.js';
import {accessTokenLifetime, refreshTokenLifetime} from '../constants/users.js';

const createSessionData = () => ({
    accessToken: randomeBytes(30).toString('base64'),
    refreshToken: randomeBytes(30).toString('base64'),
    accessTokenValideUntil:  new Date(Date.now() + accessTokenLifetime),
    refreshTokenValideUntil:  new Date(Date.now() + refreshTokenLifetime),
});

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

    const sessionData = createSessionData();

    return SessionCollection.create({
        userId: user._id,
        ...sessionData,
});
};

export const refreshToken = async (payload) => {
    const oldSession = await SessionCollection.findOne({
        _id: payload.sessionId, 
        refreshToken: payload.refreshToken
    });
    if (!oldSession) {
        throw createHttpError(401, 'Session not found');
    }
    if(Date.now() > oldSession.refreshTokenValideUntil) {
        throw createHttpError(401, 'Refresh token expired');
    }

    await SessionCollection.deleteOne({id: payload.sessionId});

    const sessionData = createSessionData();

    return SessionCollection.create({
        userId: oldSession.userId,
        ...sessionData,
    });
};

export const logout = async sessionId => {
    await SessionCollection.deleteOne({id: sessionId});
};


export const getUser = filter => UserCollection.findOne(filter);

export const getSession = filter => SessionCollection.findOne(filter);