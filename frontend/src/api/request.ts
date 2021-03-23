import axios from "axios";
// import mock from "./mock";

/**
 * 添加这一行就代表使用模拟数据
 */
// const env = process.env.NODE_ENV;
// mock();

/**
 * 设置网站默认后端调用地址
 */
const request = axios.create({
  baseURL: "http://127.0.0.1:7001/",
});

export default request;
