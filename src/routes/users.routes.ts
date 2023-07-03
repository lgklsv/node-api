import { IncomingMessage, ServerResponse } from 'http';
import { UsersController } from '../users/controller';
import { METHODS, STATUS_CODES, USERS_URL } from '../const';
import { extractId } from '../utils/extractId';
import { AppError } from '../errors/AppError';

export const usersRouter = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  const usersController = new UsersController();
  const { url, method } = req;
  const id = extractId(url, USERS_URL);

  switch (method) {
    case METHODS.GET:
      if (id) {
        res.writeHead(STATUS_CODES.OK, {
          'Content-Type': 'application/json',
        });
        res.end(JSON.stringify('USER BY ID'));
      } else {
        const users = await usersController.getUsers();
        res.writeHead(STATUS_CODES.OK, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
      }
      break;
    default:
      throw new AppError(STATUS_CODES.NOT_FOUND, 'Invalid method');
  }
};
