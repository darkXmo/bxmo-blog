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
import { defineComponent, onMounted, ref } from "vue";
import Layout from "@/layouts/index.vue";
import MarkdownCom from "@/components/Markdown/MarkdownCom.vue";
import MarkdownHead from "@/components/Markdown/MarkdownHead.vue";
import publish from "@/controller/Publish/publish";
import ArticleInfo from "@/models/ArticleInfo";

import { onBeforeRouteLeave, useRouter } from "vue-router";
import { useStore } from "vuex";
import { message } from "ant-design-vue";

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

    const saveContent = (e: KeyboardEvent) => {
      if (e.key === "s" && e.ctrlKey === true) {
        e.preventDefault();
        window.localStorage.setItem("article_content", content.value.rawStr);
        window.localStorage.setItem(
          "article_info",
          JSON.stringify({
            title: info.value.title,
            author: info.value.author,
            category: info.value.category,
            tags: info.value.tags,
            book: info.value.book,
            abstract: info.value.abstract,
          })
        );
        message.info("已保存");
      }
    };

    onMounted(() => {
      document.addEventListener("keydown", saveContent);
    });

    onBeforeRouteLeave(() => {
      document.removeEventListener("keydown", saveContent);
    });

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
