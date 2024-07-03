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
const hashPassword = (password) => {
    return bcrypt_1.default.hash(password, SALT_ROUNDS);
};
const isAccountPresent = (userName, email) => __awaiter(void 0, void 0, void 0, function* () {
    const userExists = yield userModel_1.default.findOne({ where: { userName: userName } })
        .then(user => !!user);
    const emailExists = yield userModel_1.default.findOne({ where: { email: email } })
        .then(user => !!user);
    return Promise.all([userExists, emailExists])
        .then(([userExists, emailExists]) => ({ userExists, emailExists }));
});
const saveAccount = (userData) => {
    return userModel_1.default.create(userData);
};
exports.default = { hashPassword, isAccountPresent, saveAccount };
