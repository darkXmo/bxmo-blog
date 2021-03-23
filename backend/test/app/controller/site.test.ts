import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';
import { SiteInfo } from 'model';
import { isSiteInfo } from '../utils';

describe('test/app/controller/article.test.ts', () => {
  // before(async () => {
  // });

  it('should GET /siteinfo', async () => {
    const result = await app.httpRequest().get('/siteinfo').expect(200);
    const siteInfo: SiteInfo = JSON.parse(result.text);
    assert(isSiteInfo(siteInfo));
  });
});
