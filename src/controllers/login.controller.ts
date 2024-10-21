import * as userService from '../services/user.service';
import * as authService from '../services/auth.service';
import { Request, Response } from 'express';
import { NotFoundError, UnauthorizedError } from '../common/errors';

export const login = (req: Request, res: Response): void => {
  const { email, password } = req.body;
  const currentUser = userService.getUserByEmail(email);

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
};
