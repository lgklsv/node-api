import { IncomingMessage, ServerResponse } from 'http';
import { UsersController } from '../users/controller';

export const usersRouter = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  const usersController = new UsersController();
  const { url, method } = req;

  if (method === 'GET') {
    // /api/users : GET
    const users = await usersController.getUsers();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
};
