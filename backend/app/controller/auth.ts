import { Controller } from 'egg';

export default class AuthController extends Controller {
  public async login() {
    const { ctx, app } = this;

    const data = ctx.request.body;
    const isValidUser = await ctx.service.auth.validUser(data);
    if (isValidUser) {
      const token = app.jwt.sign({
        username: data.username,
      }, app.config.jwt.secret);
      ctx.body = { token };
    } else {
      ctx.status = 403;
      ctx.message = 'Login Failed';
    }
  }

  public async register() {
    const { ctx } = this;
    const data = ctx.request.body;
    const userId = await ctx.service.auth.register(data);
    ctx.body = {
      userId,
    };
  }
}
