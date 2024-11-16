import * as userService from '../services/user.service';
import * as authService from '../services/auth.service';
import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../common/errors';

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    const currentUser = await userService.getUserByEmail(email);
  
    if (!currentUser) {
      throw new UnauthorizedError();
    }
  
    const match = authService.checkPassword(password, currentUser);
  
    if (!match) {
      throw new UnauthorizedError();
    }
  
    const token = authService.createAccessToken(currentUser.role);
    const refreshToken = authService.createRefreshToken();
  
    const cookieSettings = {
      sameSite: 'lax' as const,
      httpOnly: true,
    };
  
    res.cookie('token', token, cookieSettings).cookie('refreshToken', refreshToken, cookieSettings);
  
    res.status(200).json({ token, refreshToken });
  } catch (e) {
    next(e);
  }
};
