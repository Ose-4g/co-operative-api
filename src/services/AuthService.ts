import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../models';
import { UserInstance } from '../models/User';
import UserRepository from '../repository/UserRepository';
import successResponse from '../middleware/response';
import AppError from '../errors/AppError';
import bcrypt from 'bcryptjs';
import { generateAccessToken } from '../utils/token';

class AuthService {
  userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
    console.log(this.userRepository);
  }

  signup() {
    return async (req: Request, res: Response, next: NextFunction) => {
      const { firstName, lastName, email, password } = req.body;

      try {
        const prevUsers = await this.userRepository.findAll({
          where: {
            email,
          },
        });

        console.log(JSON.parse(JSON.stringify(prevUsers)));

        if (prevUsers.length > 0) return next(new AppError('User with email already exists', 400));
        const user = await this.userRepository.create({
          email,
          password,
          firstName,
          lastName,
        } as UserInstance);

        return successResponse(res, 201, 'User signup successful', {
          email,
          password,
          firstName,
          lastName,
        });
      } catch (error) {
        return next(error);
      }
    };
  }

  login() {
    return async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body;

      try {
        const users = (await this.userRepository.findAll({
          attributes: ['id', 'email', 'password'],
          where: {
            email,
          },
        })) as UserInstance[];

        if (users.length === 0) return next(new AppError('User not found', 404));

        const isValidPassword = await bcrypt.compare(password, users[0].password);

        if (!isValidPassword) return next(new AppError('Invalid email or password', 400));

        const accessToken = generateAccessToken(String(users[0].id));
        return successResponse(res, 200, 'User login successful', { accessToken });
      } catch (error) {
        return next(error);
      }
    };
  }
}

export default AuthService;
