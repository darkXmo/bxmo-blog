export const selectionPos = (
  element: HTMLTextAreaElement | HTMLInputElement
): number => {
  if (element.selectionStart) {
    return element.selectionStart;
  } else {
    return 0;
  }
};
