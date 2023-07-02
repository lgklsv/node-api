import 'dotenv/config';
import http from 'http';
import { UsersController } from './users/controller';

const PORT = process.env.PORT || 5137;

const server = http.createServer(async (req, res) => {
  // /api/users : GET
  if (req.url === '/api/users' && req.method === 'GET') {
    const users = await new UsersController().getUsers();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
