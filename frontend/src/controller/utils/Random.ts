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
