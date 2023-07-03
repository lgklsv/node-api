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

      const newUserData = await getReqData(req);
      validateUserData(newUserData);

      const createdUser = await usersController.createUser(
        JSON.parse(newUserData)
      );

      res.writeHead(STATUS_CODES.CREATED);
      res.end(JSON.stringify(createdUser));
      break;
    case METHODS.PUT:
      if (!id) throw new AppError(STATUS_CODES.BAD_REQUEST, ERROR_MES.NO_ID);

      const userDataToUpdate = await getReqData(req);
      validateUserData(userDataToUpdate);

      const updatedUser = await usersController.updateUser(
        id,
        JSON.parse(userDataToUpdate)
      );

      res.writeHead(STATUS_CODES.OK);
      res.end(JSON.stringify(updatedUser));
      break;
    case METHODS.DELETE:
      if (!id) throw new AppError(STATUS_CODES.BAD_REQUEST, ERROR_MES.NO_ID);

      await usersController.deleteUser(id);

      res.writeHead(STATUS_CODES.NO_CONTENT);
      res.end();
      break;
    default:
      throw new AppError(STATUS_CODES.NOT_FOUND, ERROR_MES.NOT_FOUND);
  }
};
