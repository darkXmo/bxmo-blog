/**
 * 该文件用于生成随机值
 */

/**
 * 随机 hsla 颜色值
 * @param saturation 饱和度
 * @param lightness 亮度
 * @param alpha 透明度
 */
export const randomColor = (saturation = 70, lightness = 40, alpha = 1) => {
  const colorAngle = Math.floor(Math.random() * 360);
  const color = `hsla(${colorAngle}, ${saturation}%, ${lightness}%, ${alpha})`;
  return color;
};

/**
 * 得到一个两数之间的随机整数
 * @param min 最小值，默认为1
 * @param max 最大值，默认为100
 * @returns
 */
export const getRandomInt = (min = 1, max = 100): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
};
