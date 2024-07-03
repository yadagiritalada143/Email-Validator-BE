import { Request, Response } from 'express';
import loginServices from '../services/login';
import { LOGIN_ERROR_MESSAGE } from '../constants/errorMessages';

const login = (req: Request, res: Response): void => {
    const { email, password } = req.body;
    loginServices
        .authenticateAccount({ email, password })
        .then(authResponse => {
            if (authResponse.success) {
                return loginServices.createCSRFToken().then(token => {
                    res.set('X-CSRF-Token', token);
                    res.cookie('jwt', authResponse.token);
                    res.json({ success: true, role: authResponse.role, token: authResponse.token });
                });
            } else {
                res.status(401).json({ success: false, message: LOGIN_ERROR_MESSAGE.INVALID_EMAIL_PASSWORD });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ success: false, message: LOGIN_ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
        });
};

export default { login };
