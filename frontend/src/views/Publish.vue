<template>
  <div class="publish-page">
    <Layout>
      <div class="container loading-in">
        <MarkdownHead ref="info" id="info" />
        <MarkdownCom ref="content" />
        <div class="operations">
          <a-button @click="cancel" size="large">取消</a-button>
          <a-button @click="confirm" type="primary" size="large">提交</a-button>
        </div>
      </div>
    </Layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Layout from "@/layouts/index.vue";
import MarkdownCom from "@/components/Markdown/MarkdownCom.vue";
import MarkdownHead from "@/components/Markdown/MarkdownHead.vue";
import publish from "@/controller/Publish/publish";
import ArticleInfo from "@/models/ArticleInfo";

import routerBack from "@/controller/utils/RouterFunc";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "PublishPage",
  components: {
    Layout,
    MarkdownCom,
    MarkdownHead,
  },
  setup() {
    const info = ref();
    const content = ref();
    const confirm = () => {
      const articleInfo: ArticleInfo = info.value.info;
      const articleContent: string = content.value.rawStr;
      publish(articleInfo, articleContent);
    };
    const router = useRouter();
    const cancel = () => {
      routerBack(router);
    };
    return {
      info,
      content,
      confirm,
      cancel,
    };
  },
});
</script>

<style scoped lang="scss">
.publish-page {
  .container {
    padding: 20px;
    > :nth-child(2) {
      margin-bottom: 1rem;
    }
    > :nth-child(3) {
      display: flex;
      justify-content: flex-end;
      > :nth-child(1) {
        margin-right: 1rem;
      }
    }
  }
}
</style>
