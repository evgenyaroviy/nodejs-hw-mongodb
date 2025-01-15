import * as authService from "../services/auth.js";

const setupSession = (res, data) => {
    res.cookie('refreshToken', data.refreshToken, {
        httpOnly: true,
        expires: data.refreshTokenValideUntil,
    });
    
    res.cookie('sessionId', data._id, {
        httpOnly: true,
        expires: data.refreshTokenValideUntil,
    });
};

export const registerController = async(req, res) => {

    const data = await authService.register(req.body);

    res.status(201).json({
        status: 201,
        message: "Successfully registered a user!",
        data,
    });
};


export const loginController = async(req, res) => {
    const data = await authService.login(req.body);
    
    setupSession(res, data);

    res.status(200).json({
        status: 200,
        message: "Successfully logged in an user!",
        data: {
            accessToken: data.accessToken,
        },
    });
};

export const refreshTokenController = async(req, res) => {
    const { refreshToken, sessionId } = req.cookies;
    const data = await authService.refreshToken({refreshToken, sessionId});

    setupSession(res, data);

    res.status(200).json({
        status: 200,
        message: "Successfully refreshed the token!",
        data: {
            accessToken: data.accessToken,
        },
    });
};

export const logoutController = async(req, res) => {
    if (req.cookies.sessionId) {
        await authService.logout(req.cookies.sessionId);
    }
    
    res.clearCookie('refreshToken');
    res.clearCookie('sessionId');
    
    res.status(204).send();

};