import { IncomingMessage, ServerResponse } from 'http';
import { usersRouter } from './users.routes';
import { ERROR_MES, STATUS_CODES, USERS_URL } from '../const';
import { AppError } from '../errors/AppError';

export const router = () => {
  return async (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    res.setHeader('Content-Type', 'application/json');
    try {
      switch (true) {
        // /api/users
        case req.url.startsWith(USERS_URL):
          await usersRouter(req, res);
          break;
        default:
          throw new AppError(STATUS_CODES.NOT_FOUND, 'Invalid route');
      }
    } catch (err) {
      let code = STATUS_CODES.INTERNAL;
      let message: string = ERROR_MES.INTERNAL;
      if (err instanceof AppError) {
        code = err.statusCode;
        message = err.message;
      }

      res.writeHead(code);
      res.end(JSON.stringify({ message }));
    }
  };
};
