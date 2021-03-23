// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportArticle from '../../../app/controller/article';
import ExportAuth from '../../../app/controller/auth';
import ExportSite from '../../../app/controller/site';

declare module 'egg' {
  interface IController {
    article: ExportArticle;
    auth: ExportAuth;
    site: ExportSite;
  }
}
