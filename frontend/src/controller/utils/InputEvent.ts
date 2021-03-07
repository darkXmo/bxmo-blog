/**
 * 获取当前光标位置
 * @param element 输入的元素
 * @returns 光标位置
 */
export const getPos = (
  element: HTMLTextAreaElement | HTMLInputElement
): number => {
  if (element.selectionStart) {
    return element.selectionStart;
  } else {
    return 0;
  }
};

/**
 * 设置光标
 * @param element 设置的元素
 * @param position 光标位置
 */
export const setPos = (
  element: HTMLTextAreaElement | HTMLInputElement,
  position: number
): void => {
  element.focus();
  element.setSelectionRange(position, position);
};
