import { v4 as uuidv4 } from 'uuid';
import { ERROR_MES, STATUS_CODES } from '../const';
import { AppError } from '../errors/AppError';
import { usersDb } from './data';

export class UsersController implements IUsersController {
  async getUsers(): Promise<User[]> {
    return usersDb;
  }

  async getUserById(id: string): Promise<User> {
    const user = usersDb.find((user) => user.id === id);
    if (!user) {
      throw new AppError(STATUS_CODES.NOT_FOUND, ERROR_MES.NO_USER);
    }
    return user;
  }

  async createUser(user: NewUser): Promise<User> {
    const createdUser = { id: uuidv4(), ...user };
    usersDb.push(createdUser);
    return createdUser;
  }
}
