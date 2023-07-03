import { ERROR_MES, STATUS_CODES } from '../../const';
import { AppError } from '../../errors/AppError';

export const validateUserData = (userData: string): boolean => {
  let userDataObj: NewUser;
  try {
    userDataObj = JSON.parse(userData) as NewUser;
  } catch {
    throw new AppError(STATUS_CODES.BAD_REQUEST, ERROR_MES.INVALID_JSON);
  }
  const { username, age, hobbies } = userDataObj;
  const allKeys = Object.keys(userDataObj);

  if (!username || typeof username !== 'string') {
    throw new AppError(STATUS_CODES.BAD_REQUEST, ERROR_MES.INVALID_USERNAME);
  }

  if (!age || typeof age !== 'number') {
    throw new AppError(STATUS_CODES.BAD_REQUEST, ERROR_MES.INVALID_AGE);
  }

  if (
    !Array.isArray(hobbies) ||
    !hobbies.every((hobby) => typeof hobby === 'string')
  ) {
    throw new AppError(STATUS_CODES.BAD_REQUEST, ERROR_MES.INVALID_HOBBIES);
  }

  if (allKeys.length !== 3) {
    throw new AppError(STATUS_CODES.BAD_REQUEST, ERROR_MES.TOO_MANY_PROPS);
  }
  return true;
};
