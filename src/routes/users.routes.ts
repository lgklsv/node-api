import { IncomingMessage, ServerResponse } from 'http';
import { UsersController } from '../users/controller';
import { ERROR_MES, METHODS, STATUS_CODES, USERS_URL } from '../const';
import { extractId, getReqData } from '../utils';
import { AppError } from '../errors/AppError';
import { validateUserData } from '../users/utils';

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
        const user = await usersController.getUserById(id);
        res.writeHead(STATUS_CODES.OK);
        res.end(JSON.stringify(user));
      } else {
        const users = await usersController.getUsers();
        res.writeHead(STATUS_CODES.OK);
        res.end(JSON.stringify(users));
      }
      break;
    case METHODS.POST:
      if (id) throw new AppError(STATUS_CODES.NOT_FOUND, ERROR_MES.NOT_FOUND);
      const userData = await getReqData(req);
      validateUserData(userData);
      const createdUser = await usersController.createUser(
        JSON.parse(userData)
      );
      res.writeHead(STATUS_CODES.CREATED);
      res.end(JSON.stringify(createdUser));
      break;
    default:
      throw new AppError(STATUS_CODES.NOT_FOUND, ERROR_MES.NOT_FOUND);
  }
};
