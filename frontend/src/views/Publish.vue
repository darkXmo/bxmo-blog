<template>
  <div class="publish-page">
    <Layout>
      <div class="container">
        <MarkdownHead ref="info" id="info" />
        <MarkdownCom ref="content" />
        <div class="operations">
          <a-button @click="confirm" type="primary" size="large">提交</a-button>
        </div>
      </div>
    </Layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Layout from "@/layouts/index.vue";
import MarkdownCom from "@/components/markdown/MarkdownCom.vue";
import MarkdownHead from "@/components/markdown/MarkdownHead.vue";
import publish from "@/controller/Publish/publish";
import ArticleInfo from "@/models/ArticleInfo";

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
    return {
      info,
      content,
      confirm,
    };
  },
});
</script>

<style scoped lang="scss">
.publish-page {
  .container {
    padding: 20px;
    > :nth-child(2) {
      min-height: 65vh;
      margin-bottom: 1rem;
    }
    > :nth-child(3) {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
