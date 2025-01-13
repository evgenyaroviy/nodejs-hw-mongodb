import Joi from "joi";
import { emailRegExp } from "../utils/regexp.js";

export const authRegisterSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().pattern(emailRegExp).unique().required(),
    password: Joi.string().min(6).required(),
});

export const authLoginSchema = Joi.object({
    email: Joi.string().pattern(emailRegExp).required(),
    password: Joi.string().min(6).required(),
});