import http, { IncomingMessage, ServerResponse } from 'http';
import { HOST_URL } from '../const';

export const loadBalancer = (
  port: number,
  portIdx: number,
  numCPUs: number
) => {
  return (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    console.info(`Request ${req.method}: ${req.url} to Load Balancer`);
    const nextPort = port + (portIdx++ % numCPUs);
    console.log(nextPort);

    const options = {
      host: HOST_URL,
      port: nextPort,
      path: req.url,
      method: req.method,
      headers: req.headers,
    };
    const connector = http.request(options, (response: IncomingMessage) => {
      console.log(`STATUS: ${response.statusCode}`);
      res.writeHead(
        response.statusCode,
        response.statusMessage,
        response.headers
      );
      response.pipe(res);
    });
    req.pipe(connector);
  };
};
