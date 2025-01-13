import * as authService from "../services/auth.js";

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
    
    res.cookie('refreshToken', data.refreshToken, {
        httpOnly: true,
        expires: data.refreshTokenValideUntil,
    });

    res.cookie('sessionId', data._id, {
        httpOnly: true,
        expires: data.refreshTokenValideUntil,
    });

    res.status(200).json({
        status: 200,
        message: "Successfully logged in an user!",
        data: {
            accessToken: data.accessToken,
        },
    });
};