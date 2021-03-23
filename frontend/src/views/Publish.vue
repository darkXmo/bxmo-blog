<template>
  <div class="publish-page">
    <Layout>
      <div class="container loading-in">
        <MarkdownHead ref="info" id="info" />
        <MarkdownCom ref="content" />
        <div class="operations">
          <a-popconfirm
            title="取消并返回上一页？"
            ok-text="取消发布"
            cancel-text="继续"
            @confirm="cancel"
          >
            <a-button size="large">取消</a-button>
          </a-popconfirm>
          <a-popconfirm
            title="确认发布该博文？"
            ok-text="确认发布"
            cancel-text="取消"
            @confirm="confirm"
          >
            <a-button type="primary" size="large">提交</a-button>
          </a-popconfirm>
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

import { useRouter } from "vue-router";
import { useStore } from "vuex";

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
    const router = useRouter();
    const store = useStore();
    const confirm = () => {
      const articleInfo: ArticleInfo = info.value.info;
      const articleContent: string = content.value.rawStr;
      publish(articleInfo, articleContent, router, store);
    };
    const cancel = () => {
      router.back();
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
