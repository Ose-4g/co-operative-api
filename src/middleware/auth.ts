import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import AppError from '../errors/AppError';
import env from '../env.config';
import { UserModel } from '../models';
import { UserInstance } from '../models/User';
import { userRepository } from '../di/serviceLocator';

/**
 * Ensures a user is signed in
 */
const requireSignIn: RequestHandler = async (req, res, next) => {
  //get bearer token from request header
  let token = req.headers.authorization;

  //if token does not exist
  if (!token) {
    return next(new AppError('Authentication is required', 400));
  }

  //if token is not bearer token
  if (!token.startsWith('Bearer')) {
    return next(new AppError('Invalid Token', 400));
  }
  token = token.split(' ')[1];

  try {
    //verify the token and get the user id
    jwt.verify(token, env.JWT_SECRET, async (err, decoded: any) => {
      if (err) {
        return next(new AppError('Invalid or expired token', 400));
      }
      const users: UserInstance[] = (await userRepository.findAll({
        attributes: ['id', 'email', 'firstName'],
        where: {
          id: parseInt(decoded.id),
        },
      })) as UserInstance[];

      if (users.length == 0) {
        return next(new AppError('User not found', 404));
      }

      req.user = users[0];
      next();
    });
  } catch (err) {
    return next(err);
  }
};

export { requireSignIn };
