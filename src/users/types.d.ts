interface User {
  id?: string;
  username: string;
  age: number;
  hobbies: string[];
}

interface IUsersController {
  getUsers: () => Promise<User[]>;
  getUserById: (id: string) => Promise<User>;
}
