import { EggAppConfig, PowerPartial } from 'egg';
import path = require('path');

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  config.cluster = {
    https: {
      key: path.join(__dirname, './5370296_bxmoback.top.key'), // https 证书绝对目录
      cert: path.join(__dirname, './5370296_bxmoback.top.crt'), // https 证书绝对目录
    },
  };
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
