<template>
  <div class="markdown-com">
    <a-textarea v-model:value="rawStr" v-on:keydown.tab="tab" id="textarea" />
    <div class="markdowned-area" v-html="markdowned"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import transformMarkdown from "@/controller/Publish/transformMarkdown";
import { selectionPos } from "@/controller/utils/keyEvent";

export default defineComponent({
  name: "MarkdownCom",
  setup() {
    const rawStr = ref<string>("");
    const markdowned = computed(() => {
      return transformMarkdown(rawStr.value);
    });
    const tab = (e: KeyboardEvent) => {
      const textarea = document.getElementById("textarea");
      if (textarea instanceof HTMLTextAreaElement) {
        const pos = selectionPos(textarea);
        textarea.value =
          textarea.value.slice(0, pos) + "  " + textarea.value.slice(pos);
        textarea.focus();
        textarea.setSelectionRange(pos + 2, pos + 2);
        rawStr.value = textarea.value;
      }
      e.preventDefault();
    };
    return {
      rawStr,
      markdowned,
      tab,
    };
  },
});
</script>

<style scoped lang="scss">
.markdown-com {
  display: grid;
  height: 100%;
  grid-template-columns: 1fr 1fr;
  textarea {
    resize: none;
  }

  > * {
    overflow: auto;
  }

  > .markdowned-area {
    padding: 4px 11px;
    border: $border-default;
    border-radius: 2px;
    background-color: #f7f7f7;
  }
}
</style>
<style lang="scss">
.markdown-com {
  $color-markdown-code-bg: rgba(27, 31, 35, 0.05);
  p {
    > code {
      padding: 0.2em 0.4em;
      margin: 0;
      font-size: 85%;
      background-color: $color-markdown-code-bg;
      border-radius: 6px;
    }
  }

  /* 滚动槽 */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    border-radius: 3px;
    background: rgba(0, 0, 0, 0.06);
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.08);
  }
  /* 滚动条滑块 */
  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: rgba(0, 0, 0, 0.12);
    -webkit-box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
  }
}
</style>
