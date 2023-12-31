interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

interface NewUser {
  username: string;
  age: number;
  hobbies: string[];
}

interface UsersDb {
  users: User[];
}

interface IUsersController {
  getUsers: () => Promise<User[]>;
  getUserById: (id: string) => Promise<User>;
  createUser: (userData: NewUser) => Promise<User>;
  updateUser: (id: string, userData: NewUser) => Promise<User>;
  deleteUser: (id: string) => Promise<void>;
}
