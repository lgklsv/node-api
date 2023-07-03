import 'dotenv/config';
import http from 'http';
import { router } from './routes';

const PORT = process.env.PORT || 5137;

const server = http.createServer(router());

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
