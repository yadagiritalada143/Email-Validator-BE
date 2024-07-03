"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const registrationController_1 = __importDefault(require("../controllers/registrationController"));
const loginController_1 = __importDefault(require("../controllers/loginController"));
const commonController_1 = __importDefault(require("../controllers/commonController"));
const commonRouter = express_1.default.Router();
commonRouter.post('/login', loginController_1.default.login);
commonRouter.post('/register', registrationController_1.default.register);
commonRouter.get('/getUserDetails/:email', commonController_1.default.getUserDetails);
commonRouter.put('/updateProfile', commonController_1.default.updateProfile);
exports.default = commonRouter;
