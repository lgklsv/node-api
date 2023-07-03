import 'dotenv/config';
import { SERVER_MODES, DEFAULT_PORT } from './const';
import { createApp } from './createApp';
import { createClusters } from './createClusters';

const { SERVER_MODE } = process.env;
const PORT = Number(process.env.PORT) || DEFAULT_PORT;
const isMulti = SERVER_MODE === SERVER_MODES.CLUSTER;

isMulti ? createClusters(PORT) : createApp(PORT);
