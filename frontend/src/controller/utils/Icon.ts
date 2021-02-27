import { createFromIconfontCN } from "@ant-design/icons-vue";

/**
 * 在 https://www.iconfont.cn/ 创建的工程的地址
 */
const ALI_PRO_CDN = "//at.alicdn.com/t/font_2369994_nltu5wc3a0g.js";

/**
 * 返回 Antd 引入 Iconfont 项目的icon组件
 */
export default createFromIconfontCN({
  scriptUrl: ALI_PRO_CDN,
});
