"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const login_1 = __importDefault(require("../services/login"));
const errorMessages_1 = require("../constants/errorMessages");
const login = (req, res) => {
    const { email, password } = req.body;
    login_1.default
        .authenticateAccount({ email, password })
        .then(authResponse => {
        if (authResponse.success) {
            return login_1.default.createCSRFToken().then(token => {
                res.set('X-CSRF-Token', token);
                res.cookie('jwt', authResponse.token);
                res.json({ success: true, role: authResponse.role, token: authResponse.token });
            });
        }
        else {
            res.status(401).json({ success: false, message: errorMessages_1.LOGIN_ERROR_MESSAGE.INVALID_EMAIL_PASSWORD });
        }
    })
        .catch(error => {
        console.log(error);
        res.status(500).json({ success: false, message: errorMessages_1.LOGIN_ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
    });
};
exports.default = { login };
