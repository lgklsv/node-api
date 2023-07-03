export enum ERROR_MES {
  INVALID_ID = 'Invalid id',
  NOT_FOUND = 'Invalid route',
  INVALID_METHOD = 'Invalid method',
  NO_USER = 'User with this id does not exist',
  NO_ID = 'Id is not provided',
  INTERNAL = 'Something went wrong on the server',

  INVALID_USERNAME = 'Username field is required and should be type of string',
  INVALID_AGE = 'Age field is required and should be type of number',
  INVALID_HOBBIES = 'Hobbies field is required and should be an array of strings or empty array',
  TOO_MANY_PROPS = "User object can't have any property other than username, age and hobbies",
  INVALID_JSON = 'Invalid JSON',
}
