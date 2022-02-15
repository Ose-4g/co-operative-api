import { Router } from 'express';
import UserModel from '../models/User';
import UserRepository from '../repository/UserRepository';
import AuthService from '../services/AuthService';
import { authService } from '../di/serviceLocator';

// const userRepository = new UserRepository(UserModel);
// const authService = new AuthService(userRepository)

const router = Router();

router.post('/signup', authService.signup());
router.post('/login', authService.login());

export default router;
