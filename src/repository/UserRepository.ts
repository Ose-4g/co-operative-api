import { UserInstance } from '../models/User';
import Repository from './Repository';
import bcrypt from 'bcryptjs';

class UserRepository extends Repository<UserInstance> {
  async create(data: UserInstance) {
    let { firstName, lastName, email, password } = data;
    password = await bcrypt.hash(password, 10);

    const user = await this.model.create({
      firstName,
      lastName,
      password,
      email,
    });
    return user;
  }
}

export default UserRepository;
