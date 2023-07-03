import { IncomingMessage, ServerResponse } from 'http';
import { usersRouter } from './users.routes';
import { USERS_URL } from '../const';
import { AppError } from '../errors/AppError';

export const router = () => {
  return async (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    try {
      switch (true) {
        // /api/users
        case req.url.startsWith(USERS_URL):
          await usersRouter(req, res);
          break;
        default:
          throw new AppError(404, 'Invalid route');
      }
    } catch (err) {
      let code = 500;
      let message = 'Something went wrong on the server';
      if (err instanceof AppError) {
        code = err.statusCode;
        message = err.message;
      }

      res.writeHead(code, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message }));
    }
  };
};
