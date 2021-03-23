import * as assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';
import { isSiteInfo } from '../utils';

describe('test/app/service/Site.site.ts', () => {
  let ctx: Context;

  before(async () => {
    ctx = app.mockContext();
  });

  it('getSiteInfo', async () => {
    const result = await ctx.service.site.getSiteInfo();
    // 确保返回值是一个正确对象
    assert(isSiteInfo(result));
  });
});

