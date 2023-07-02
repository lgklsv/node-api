import { usersDb } from './data';

export class UsersController implements IUsersController {
  async getUsers(): Promise<User[]> {
    const users = usersDb;
    return new Promise((resolve, _) => resolve(users));
  }
}
