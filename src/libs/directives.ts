import { ComputedRef, DirectiveBinding } from 'vue';

/**
 * 原生复制功能
 * @param elem 带绑定的DOM
 * @param value 复制的值
 * @param successText 成功后的文字
 */
const copyOrigin = (
  elem: HTMLElement,
  text: ComputedRef<string>,
  success?: () => void,
) => {
  if (!text) {
    return;
  }
  const textarea = document.createElement('textarea');
  textarea.setAttribute('readonly', '');
  textarea.value = text.value;
  elem.appendChild(textarea);

  let result: boolean = false;
  try {
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);
    textarea.removeAttribute('readonly');
    result = document.execCommand('copy');
  } catch (e) {
    result = false;
  }

  if (result && success) {
    success();
  }
  textarea.remove();
}

/**
 * 复制指令
 * 绑定的DOM必须是允许被插入的DOM
 * @param element
 * @example
 * 需要先进行注册
 * directives: { copy }
 * <span v-copy="复制的变量"></span>
 * 变量类型为 字符串 或 { text: string, success: Function }
 */
export const copy = {
  mounted(elem: HTMLElement, binding: DirectiveBinding) {
    const value = binding.value;
    elem.addEventListener('click', () => {
      if (value.text.value !== '') {
        copyOrigin(elem, value.text, value.success);
      }
    })
  },
};
