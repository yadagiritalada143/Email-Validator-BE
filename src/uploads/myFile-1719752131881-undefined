"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __importDefault(require("../services/common"));
const commonErrorMessages_1 = require("../constants/commonErrorMessages");
const getUserDetails = (req, res) => {
    common_1.default
        .getUserDetails(req.params.email)
        .then(fetchUserDetailsResponse => {
        console.log(fetchUserDetailsResponse);
        res.status(200).json(fetchUserDetailsResponse);
    })
        .catch(error => {
        console.error(`Error in fetching user details: ${error}`);
        res.status(500).json({ success: false, message: commonErrorMessages_1.COMMON_ERRORS.USER_FETCHING_ERROR });
    });
};
const updateProfile = (req, res) => {
    common_1.default
        .updateProfile(req.body)
        .then((updateProfileResponse) => {
        res.status(200).json(updateProfileResponse);
    })
        .catch((error) => {
        console.error(`Error in updating profile details: ${error}`);
        res.status(500).json({ success: false, message: commonErrorMessages_1.COMMON_ERRORS.USER_UPDATING_ERROR });
    });
};
exports.default = { getUserDetails, updateProfile };
