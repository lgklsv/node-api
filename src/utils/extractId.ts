import { validate as uuidValidate } from 'uuid';
import { AppError } from '../errors/AppError';

export const extractId = (route: string, baseRoute: string): string | null => {
  if (route === baseRoute || route === baseRoute + '/') return null;

  if (route.startsWith(baseRoute)) {
    const afterBaseRoute = route.split(baseRoute)[1];
    const afterBaseRouteSplitted = afterBaseRoute.split('/');

    if (afterBaseRouteSplitted.length !== 2) {
      throw new AppError(404, 'Invalid route');
    }

    const id = afterBaseRouteSplitted[1];

    if (!uuidValidate(id)) {
      throw new AppError(400, 'Invalid id');
    }

    return id;
  }
};
