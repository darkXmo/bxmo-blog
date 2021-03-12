<template>
  <div class="markdown-com">
    <a-textarea v-model:value="rawStr" v-on:keydown.tab="tab" id="textarea" />
    <div class="markdowned-area" v-html="markdowned"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import transformMarkdown from "@/controller/Publish/transformMarkdown";

import tabEvent from "@/controller/Publish/keyEvent";
// import "@/assets/style/github.css";

export default defineComponent({
  name: "MarkdownCom",
  setup() {
    const rawStr = ref<string>("");
    const markdowned = computed(() => {
      return transformMarkdown(rawStr.value);
    });
    const tab = (e: KeyboardEvent) => {
      const textArea = document.getElementById("textarea");
      if (textArea instanceof HTMLTextAreaElement) {
        tabEvent(e, rawStr, textArea);
      }
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
  height: 70vh;
  grid-template-columns: 1fr 1fr;
  border: $border-default;
  background-color: #f7f7f7;
  > * {
    overflow: auto;
  }
}
</style>
<style lang="scss">
.markdown-com {
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
