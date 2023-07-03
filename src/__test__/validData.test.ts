import http from 'http';
import supertest, { SuperTest } from 'supertest';
import { DEFAULT_PORT, STATUS_CODES, USERS_URL } from '../const';
import { router } from '../routes';

const user1 = {
  username: 'bob',
  age: 12,
  hobbies: ['swimming', 'gaming'],
};

const user2 = {
  username: 'alice',
  age: 21,
  hobbies: ['programming'],
};

describe('e2e tests single core valid data', () => {
  let server: SuperTest<supertest.Test>;
  let createdUser1: User;
  let updatedUser2: User;
  let userId: string;

  beforeAll(() => {
    server = supertest(http.createServer(router(DEFAULT_PORT)));
  });

  it('should return empty array on the first GET request', async () => {
    const response = await server.get(USERS_URL);

    expect(response.statusCode).toBe(STATUS_CODES.OK);
    expect(response.body).toMatchObject([]);
  });

  it('should create new user with POST request and valid data', async () => {
    const response = await server.post(USERS_URL).send(user1);
    createdUser1 = response.body;
    userId = response.body.id;
    expect(response.statusCode).toBe(STATUS_CODES.CREATED);
    expect(createdUser1.username).toBe(user1.username);
    expect(createdUser1.age).toBe(user1.age);
    expect(createdUser1.hobbies).toMatchObject(user1.hobbies);
  });

  it('should GET newly created user', async () => {
    const response = await server.get(USERS_URL);

    expect(response.statusCode).toBe(STATUS_CODES.OK);
    expect(response.body).toMatchObject([createdUser1]);
  });

  it('should GET newly created user by ID', async () => {
    const response = await server.get(`${USERS_URL}/${userId}`);

    expect(response.statusCode).toBe(STATUS_CODES.OK);
    expect(response.body).toMatchObject(createdUser1);
  });

  it('should update user with PUT request, id and valid data', async () => {
    const response = await server.put(`${USERS_URL}/${userId}`).send(user2);
    updatedUser2 = response.body;

    expect(response.statusCode).toBe(STATUS_CODES.OK);
    expect(updatedUser2.username).toBe(user2.username);
    expect(updatedUser2.age).toBe(user2.age);
    expect(updatedUser2.hobbies).toMatchObject(user2.hobbies);
  });

  it('should GET newly updated user', async () => {
    const response = await server.get(USERS_URL);

    expect(response.statusCode).toBe(STATUS_CODES.OK);
    expect(response.body).toMatchObject([updatedUser2]);
  });

  it('should DELETE user', async () => {
    const response = await server.delete(`${USERS_URL}/${userId}`);

    expect(response.statusCode).toBe(STATUS_CODES.NO_CONTENT);
    expect(response.body).toBe('');
  });

  it('should return empty array when there is no more users', async () => {
    const response = await server.get(USERS_URL);

    expect(response.statusCode).toBe(STATUS_CODES.OK);
    expect(response.body).toMatchObject([]);
  });
});
