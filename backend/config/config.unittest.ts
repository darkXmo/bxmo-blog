import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  const mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '192.168.91.129',
      // 端口号
      port: '3306',
      // 用户名
      user: 'xmo',
      // 密码
      password: 'ds',
      // 数据库名
      database: 'bxmo_test',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
  return {
    ...config,
    mysql,
  };
};
