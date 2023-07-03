import http from 'http';
import { v4 as uuidv4 } from 'uuid';
import supertest, { SuperTest } from 'supertest';
import { DEFAULT_PORT, ERROR_MES, STATUS_CODES, USERS_URL } from '../const';
import { router } from '../routes';

const RANDOM_UUID = uuidv4();

const newUsers = [
  {
    username: 'bob',
    age: 12,
    hobbies: ['swimming', 'gaming'],
  },
  {
    username: 'alice',
    age: 21,
    hobbies: ['programming'],
  },
  {
    username: 'ron',
    age: 45,
    hobbies: ['tv'],
  },
  {
    username: 'jane',
    age: 18,
    hobbies: ['basketball'],
  },
  {
    username: 'alix',
    age: 21,
    hobbies: ['programming', 'movies'],
  },
];

describe('e2e tests single core mixed data', () => {
  let server: SuperTest<supertest.Test>;
  let createdUsers: User[];
  let userIdToDelete1: string;
  let userIdToDelete2: string;

  beforeAll(() => {
    server = supertest(http.createServer(router(DEFAULT_PORT)));
  });

  it('should return empty array on the first GET request', async () => {
    const response = await server.get(USERS_URL);

    expect(response.statusCode).toBe(STATUS_CODES.OK);
    expect(response.body).toMatchObject([]);
  });

  it('should create 5 new users with POST request and valid data', async () => {
    const responses = await Promise.all(
      newUsers.map((user) => server.post(USERS_URL).send(user))
    );
    createdUsers = responses.map((res) => res.body);
    userIdToDelete1 = createdUsers[createdUsers.length - 1].id;
    userIdToDelete2 = createdUsers[createdUsers.length - 2].id;

    const haveAges = createdUsers.every(
      (user) => user.age && typeof user.age === 'number'
    );
    const haveUsernames = createdUsers.every(
      (user) => user.username && typeof user.username === 'string'
    );
    const haveIds = createdUsers.every(
      (user) => user.id && typeof user.id === 'string'
    );
    const haveHobbies = createdUsers.every(
      (user) => user.hobbies && Array.isArray(user.hobbies)
    );
    expect(createdUsers).toHaveLength(5);
    expect(haveAges).toBeTruthy();
    expect(haveUsernames).toBeTruthy();
    expect(haveIds).toBeTruthy();
    expect(haveHobbies).toBeTruthy();
  });

  it('should GET newly created user', async () => {
    const response = await server.get(USERS_URL);

    expect(response.statusCode).toBe(STATUS_CODES.OK);
    expect(response.body).toMatchObject(createdUsers);
  });

  it('should DELETE multiple users', async () => {
    const idsToDelete = [RANDOM_UUID, userIdToDelete2, userIdToDelete1];
    await Promise.all(
      idsToDelete.map((id) => server.delete(`${USERS_URL}/${id}`))
    );

    const response = await server.get(USERS_URL);
    expect(response.body).toHaveLength(3);
  });

  it('should not be able to access deleted users by GET method', async () => {
    const response = await server.get(`${USERS_URL}/${userIdToDelete2}`);
    expect(response.statusCode).toBe(STATUS_CODES.NOT_FOUND);
    expect(response.body).toMatchObject({ message: ERROR_MES.NO_USER });
  });
});
