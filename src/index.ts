import 'dotenv/config';
import { createApp } from './createApp';
import { createClusters } from './createClusters';
import { config } from './utils/config';

const { PORT, isMulti } = config();

isMulti ? createClusters(PORT) : createApp(PORT);
