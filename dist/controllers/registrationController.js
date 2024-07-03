"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const registration_1 = __importDefault(require("../services/registration"));
const registrationMessages_1 = require("../constants/registrationMessages");
const register = (req, res) => {
    const newRegistrationData = req.body;
    registration_1.default
        .isAccountPresent(newRegistrationData.userName, newRegistrationData.email)
        .then(({ userExists, emailExists }) => {
        if (userExists) {
            throw new Error(registrationMessages_1.ERRORS.USERNAME_EXISTS);
        }
        if (emailExists) {
            throw new Error(registrationMessages_1.ERRORS.EMAIL_EXISTS);
        }
        return registration_1.default.hashPassword(newRegistrationData.password);
    })
        .then(hashedPassword => {
        newRegistrationData.password = hashedPassword;
        return registration_1.default.saveAccount(newRegistrationData);
    })
        .then(responseAfterRegistration => {
        return res.status(201).json({ message: registrationMessages_1.ACCOUNT_MESSAGES.REGISTRATION_SUCCESS });
    })
        .catch(error => {
        if (error.message === registrationMessages_1.ERRORS.EMAIL_EXISTS || error.message === registrationMessages_1.ERRORS.USERNAME_EXISTS) {
            return res.status(409).json({ message: error.message });
        }
        return res.status(500).json({ message: registrationMessages_1.ERRORS.USER_CREATION_ERROR });
    });
};
exports.default = { register };
