import express, { Router } from 'express';
import registerController from '../controllers/registrationController';
import loginController from '../controllers/loginController';
import commonController from '../controllers/commonController';
import userSchema from '../middlewares/schemas/userSchema';
import validateProfileRequest from '../middlewares/validateProfileUpdate';

const commonRouter: Router = express.Router();

commonRouter.post('/login', loginController.login);
commonRouter.post('/register', registerController.register);
commonRouter.get('/getUserDetails/:email', commonController.getUserDetails);
commonRouter.put('/updateProfile', validateProfileRequest(userSchema), commonController.updateProfile);

export default commonRouter;