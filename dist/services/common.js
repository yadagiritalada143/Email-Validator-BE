"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../model/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const SALT_ROUNDS = 10;
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.hash(password, SALT_ROUNDS);
});
const getUserDetails = (email) => {
    return new Promise((resolve, reject) => {
        userModel_1.default.findOne({ where: { email } })
            .then(user => {
            if (!user) {
                resolve({ success: false });
            }
            else {
                resolve({
                    success: true,
                    user: {
                        firstName: user.lastName,
                        lastName: user.lastName,
                        userName: user.userName,
                        password: user.password,
                        email: user.email,
                        mobileNumber: user.mobileNumber,
                    }
                });
            }
        })
            .catch(error => {
            console.error('Error in fetching details:', error);
            reject({ success: false });
        });
    });
};
const updateProfile = (userDetailsToUpdate) => __awaiter(void 0, void 0, void 0, function* () {
    let { firstName, lastName, userName, password, mobileNumber, email } = userDetailsToUpdate;
    const hashedPassword = yield hashPassword(password);
    return new Promise((resolve, reject) => {
        userModel_1.default
            .update({ firstName, lastName, userName, password: hashedPassword, mobileNumber }, { where: { email: email } })
            .then((responseAfterUpdateProfile) => {
            resolve({
                success: true
            });
        })
            .catch(error => {
            console.error('Error in updating Profile:', error);
            reject({ success: false });
        });
    });
});
exports.default = { getUserDetails, updateProfile };
