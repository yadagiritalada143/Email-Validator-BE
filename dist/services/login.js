"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../model/userModel"));
const dotenv_1 = __importDefault(require("dotenv"));
const csrf_token_1 = __importDefault(require("csrf-token"));
dotenv_1.default.config();
const SECRET_KEY = process.env.SECRET_KEY;
const createCSRFToken = () => {
    return new Promise((resolve, reject) => {
        try {
            const token = csrf_token_1.default.createSync('auth-module project');
            resolve(token);
        }
        catch (error) {
            reject(error);
        }
    });
};
const authenticateAccount = ({ email, password }) => {
    return new Promise((resolve, reject) => {
        userModel_1.default.findOne({ where: { email } })
            .then(user => {
            if (!user) {
                resolve({ success: false });
            }
            else {
                bcrypt_1.default.compare(password, user.password).then((isPasswordValid) => {
                    if (!isPasswordValid) {
                        resolve({ success: false });
                    }
                    else {
                        const token = jsonwebtoken_1.default.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });
                        resolve({ success: true, role: user.userRole, token });
                    }
                });
            }
        })
            .catch(error => {
            console.error('Error in authentication:', error);
            reject({ success: false });
        });
    });
};
const loginService = {
    authenticateAccount,
    createCSRFToken
};
exports.default = loginService;
