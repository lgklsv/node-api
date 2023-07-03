import { IncomingMessage, ServerResponse } from 'http';
import { usersRouter } from './users.routes';
import { USERS_URL } from '../const';

export const router = () => {
  return async (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    try {
      switch (true) {
        // /api/users
        case req.url.startsWith(USERS_URL):
          await usersRouter(req, res);
          break;
        default:
          throw new Error('404');
      }
    } catch (err) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: err.message }));
    }
  };
};
