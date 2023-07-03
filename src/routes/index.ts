import { IncomingMessage, ServerResponse } from 'http';
import { usersRouter } from './users.routes';

export const router = () => {
  return async (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    try {
      // /api/users
      if (req.url.startsWith('/api/users')) {
        usersRouter(req, res);
      }
    } catch (err) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Route not found' }));
    }
  };
};
