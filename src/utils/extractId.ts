import { validate as uuidValidate } from 'uuid';
import { AppError } from '../errors/AppError';
import { STATUS_CODES } from '../const';

export const extractId = (route: string, baseRoute: string): string | null => {
  if (route === baseRoute || route === baseRoute + '/') return null;

  if (route.startsWith(baseRoute)) {
    const afterBaseRoute = route.split(baseRoute)[1];
    const afterBaseRouteSplitted = afterBaseRoute.split('/');

    if (afterBaseRouteSplitted.length !== 2) {
      throw new AppError(STATUS_CODES.NOT_FOUND, 'Invalid route');
    }

    const id = afterBaseRouteSplitted[1];

    if (!uuidValidate(id)) {
      throw new AppError(STATUS_CODES.BAD_REQUEST, 'Invalid id');
    }

    return id;
  }
};
