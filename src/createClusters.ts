import cluster from 'cluster';
import os from 'os';
import http from 'http';
import { createApp } from './createApp';
import { loadBalancer } from './loadBalancer';
import { usersDb } from './users/data';

export const createClusters = (port: number) => {
  if (cluster.isPrimary) {
    const numCPUs = os.cpus().length;

    for (let i = 0; i < numCPUs - 1; i++) {
      const workerPort = port + 1 + i;
      const worker = cluster.fork({ workerPort });

      worker.on('message', (message) => {
        const workers = cluster.workers;
        if (workers) {
          Object.keys(workers).forEach((id) => workers[id]?.send(message));
        }
      });
    }

    let portIdx = 0;
    const server = http.createServer(loadBalancer(port, portIdx, numCPUs));

    server.listen(port, () => {
      console.info(`⚙️  Load Balancer is listening on port ${port}`);
    });

    server.on('error', (err) =>
      console.error(`💀 Something went wrong on the server, ERR: ${err}`)
    );
  } else {
    const workerPort = Number(process.env.workerPort);
    createApp(workerPort);

    process.on('message', (message: UsersDb) => {
      if (!message) return;
      usersDb.users = message.users;
    });
  }
};
