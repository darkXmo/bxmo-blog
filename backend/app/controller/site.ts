import { Controller } from 'egg';


export default class SiteController extends Controller {
  public async getSiteInfo() {
    const { ctx } = this;
    const siteInfo = await ctx.service.site.getSiteInfo();
    ctx.body = siteInfo;
  }
}
