import http from 'http';
import { router } from './routes';

export const createApp = (port: number) => {
  const server = http.createServer(router);

  server.listen(port, () => {
    console.log(`🚀 Server started on port: ${port}, pid=${process.pid}`);
  });

  server.on('error', (err) =>
    console.error(`💀 Something went wrong on the server, ERR: ${err}`)
  );
};
