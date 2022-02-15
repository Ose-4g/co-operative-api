import { UserModel } from '../models';
import UserRepository from '../repository/UserRepository';
import AuthService from '../services/AuthService';

const userRepository = new UserRepository(UserModel);

const authService = new AuthService(userRepository);

export { userRepository, authService };
