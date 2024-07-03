import Joi from 'joi';
const userSchema = Joi.object({
    firstName: Joi.string().min(3).max(30).optional(),
    lastName: Joi.string().min(3).max(30).optional(),
    userName: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(30).required(),
    mobileNumber: Joi.number().integer().min(0).optional(),
    userRole: Joi.string().optional(),
});

export default userSchema;