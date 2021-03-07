import { getPos, setPos } from "@/controller/utils/InputEvent";
import { Ref } from "@vue/reactivity";

/**
 * 将按下tab事件修改为输入两个空格。
 * @param e 监听的Tab输入事件
 * @param rawStr 这个输入事件所在的字符串
 * @param htmlElement 输入事件所针对的HTML元素
 */
const tabEvent = (
  e: KeyboardEvent,
  rawStr: Ref,
  htmlElement: HTMLInputElement | HTMLTextAreaElement
) => {
  e.preventDefault();
  const pos = getPos(htmlElement);
  htmlElement.value =
    htmlElement.value.slice(0, pos) + "  " + htmlElement.value.slice(pos);
  setPos(htmlElement, pos + 2);
  rawStr.value = htmlElement.value;
};

export default tabEvent;
