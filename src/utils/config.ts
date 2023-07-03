import { DEFAULT_PORT, SERVER_MODES } from '../const';

export const config = () => {
  const PORT = Number(process.env.PORT) || DEFAULT_PORT;
  const { SERVER_MODE } = process.env;
  const isMulti = SERVER_MODE === SERVER_MODES.CLUSTER;
  return { PORT, isMulti };
};
