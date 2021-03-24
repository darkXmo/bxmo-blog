import axios from "axios";
// import mock from "./mock";

/**
 * 添加这一行就代表使用模拟数据
 */
const env = process.env.NODE_ENV;
// mock();
let baseURL = "http://192.168.91.129:7001/";
// if (env === "production") {
baseURL = "https://bxmoback.top/";
// }

/**
 * 设置网站默认后端调用地址
 */
const request = axios.create({
  baseURL,
});

export default request;
