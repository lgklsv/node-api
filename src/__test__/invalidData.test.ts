import { v4 as uuidv4 } from 'uuid';
import http from 'http';
import supertest, { SuperTest } from 'supertest';
import { DEFAULT_PORT, ERROR_MES, STATUS_CODES, USERS_URL } from '../const';
import { router } from '../routes';

const RANDOM_UUID = uuidv4();
const FAKE_UUID = 'weruwe9ryw97ryweirywoeury';

const wrongUser1 = {
  username: false,
  age: '12',
  hobbies: ['swimming', 'gaming'],
  id: 'someidlol',
};

const user1 = {
  username: 'alice',
  age: 21,
  hobbies: ['programming'],
};

const WRONG_API1 = '/api/frogs';
const WRONG_API2 = '/api/users/uwuywiuryw/wr8ywrywr/9wyrw9';

describe('e2e tests single core invalid data', () => {
  let server: SuperTest<supertest.Test>;

  beforeAll(() => {
    server = supertest(http.createServer(router(DEFAULT_PORT)));
  });

  it('should return invalid route 404 message if access wrong api route', async () => {
    const response1 = await server.get(WRONG_API1);
    const response2 = await server.get(WRONG_API2);

    expect(response1.statusCode).toBe(STATUS_CODES.NOT_FOUND);
    expect(response1.body).toMatchObject({ message: ERROR_MES.NOT_FOUND });

    expect(response2.statusCode).toBe(STATUS_CODES.NOT_FOUND);
    expect(response2.body).toMatchObject({ message: ERROR_MES.NOT_FOUND });
  });

  it('should return bad request 400 if request body does not contain required fields on POST request', async () => {
    const response = await server.post(USERS_URL).send(wrongUser1);

    expect(response.statusCode).toBe(STATUS_CODES.BAD_REQUEST);
  });

  it('should return 404 if GET user by id and user does not exist', async () => {
    const responseGet = await server.get(`${USERS_URL}/${RANDOM_UUID}`);
    const responsePut = await server
      .put(`${USERS_URL}/${RANDOM_UUID}`)
      .send(user1);
    const responseDelete = await server.delete(`${USERS_URL}/${RANDOM_UUID}`);

    expect(responseGet.statusCode).toBe(STATUS_CODES.NOT_FOUND);
    expect(responseGet.body).toMatchObject({ message: ERROR_MES.NO_USER });

    expect(responsePut.statusCode).toBe(STATUS_CODES.NOT_FOUND);
    expect(responsePut.body).toMatchObject({ message: ERROR_MES.NO_USER });

    expect(responseDelete.statusCode).toBe(STATUS_CODES.NOT_FOUND);
    expect(responseDelete.body).toMatchObject({ message: ERROR_MES.NO_USER });
  });

  it('should return 400 bad request if id exists but is not valid uuid', async () => {
    const responseGet = await server.get(`${USERS_URL}/${FAKE_UUID}`);
    const responsePut = await server
      .put(`${USERS_URL}/${FAKE_UUID}`)
      .send(user1);
    const responseDelete = await server.delete(`${USERS_URL}/${FAKE_UUID}`);

    expect(responseGet.statusCode).toBe(STATUS_CODES.BAD_REQUEST);
    expect(responseGet.body).toMatchObject({ message: ERROR_MES.INVALID_ID });

    expect(responsePut.statusCode).toBe(STATUS_CODES.BAD_REQUEST);
    expect(responsePut.body).toMatchObject({ message: ERROR_MES.INVALID_ID });

    expect(responseDelete.statusCode).toBe(STATUS_CODES.BAD_REQUEST);
    expect(responseDelete.body).toMatchObject({
      message: ERROR_MES.INVALID_ID,
    });
  });
});
