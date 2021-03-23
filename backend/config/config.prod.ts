import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  const mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'xmo',
      password: 'ds',
      database: 'bxmo',
    },
    app: true,
    agent: false,
  };
  return {
    ...config,
    mysql,
  };
};
