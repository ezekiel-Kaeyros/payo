import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import {ErrorCodes} from '../constants/ErrorCodes';

export const createToken = (user: any) => {
    return jwt.sign({ user: user }, process.env.SECRET, { expiresIn: '1h' });
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, process.env.SECRET);
}

export const isAuthenticate = (req: any, res: Response, next: any) => {
  /* 
    const token = req.headers['authorization'].split(' ')[1];
    if (!token) {
      return res.status(ErrorCodes.Un_Authorized).send('Access Denied. No token provided.');
    }
  
    try {
      const decoded: any = jwt.verify(token, process.env.SECRET);
      req.user = decoded.user;
      next();
    } catch (error) {
      return res.status(ErrorCodes.Bad_Request).send('Invalid Token.');
    } */
    next();
  };