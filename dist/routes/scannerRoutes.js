"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const scannerController_1 = __importDefault(require("../controllers/scannerController"));
const scannerRouter = express_1.default.Router();
scannerRouter.post('/uploadFile', scannerController_1.default.scanFile);
exports.default = scannerRouter;
