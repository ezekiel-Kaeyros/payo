import { NextFunction, Request, Response } from 'express';
import {
  getUserByEmail,
} from '../db';
import { ErrorCodes} from '../constants';
import {createToken} from '../utils';

const AuthController = {

  login: async (req: Request, res: Response): Promise<any> => {

    const { email, password } = req.body;
    let user = await getUserByEmail(email);
    if (!user) {
        return res
        .status(ErrorCodes.Bad_Request)
        .send('Your email and password combination does not match an account.');
    }
    const validate = await user.isValidPassword(password);
    if (!validate) {
        return res
        .status(ErrorCodes.Bad_Request)
        .send('Your email and password combination does not match an account.');
    }
    const token= createToken(user)
   

    return res.send({user,token});
  
  },

  logout: async (req: Request, res: Response): Promise<any> => {
    if (req.cookies['token']) {
      return res.clearCookie('token').send('You have been successfully logged out.');
    } else {
      return res.send('You have been successfully logged out.');
    }
  },
  forgotPassword: async (req: Request, res: Response): Promise<any> => {
 
  },
  resetPassword: async (req: Request, res: Response): Promise<any> => {
   
  },
};

export default AuthController;
