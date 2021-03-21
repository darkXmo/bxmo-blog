import { Service } from 'egg';
import { createHmac } from 'crypto';
import { LoginForm } from 'model';
/**
 * Test Service
 */
export default class Article extends Service {

  private secret = 'bxmo-test';
  /**
   * 验证登录表单
   * @param body - 登录表单
   */
  public async validUser(body: LoginForm) {
    const username = body.username;
    const password = createHmac('sha256', this.secret).update(body.password).digest('hex');
    const user = await this.getUser(username);
    if (user.password === password && username === user.username) {
      return true;
    }
    return false;
  }

  public async register(body: LoginForm) {
    const username = body.username;
    const password = createHmac('sha256', this.secret).update(body.password).digest('hex');
    const userId = await this.insertUser(username, password);
    return userId;
  }

  private async getUser(username: string) {
    const mysql = this.app.mysql;
    const ans = mysql.get('user', { username });
    if (!ans) {
      throw new Error('User Not Found');
    }
    return ans;
  }

  private async insertUser(username: string, password: string) {
    const mysql = this.app.mysql;
    const ans = mysql.insert('user', { username, password });
    return (await ans).insertId;
  }


}
