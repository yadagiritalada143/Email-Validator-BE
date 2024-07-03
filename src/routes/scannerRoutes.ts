import express, { Router } from 'express';
import scannerController from '../controllers/scannerController';
import validateFileType from '../middlewares/validateFileType';

const scannerRouter: Router = express.Router();

scannerRouter.post('/uploadFile', validateFileType.scanFile, scannerController.scanFile);

export default scannerRouter;