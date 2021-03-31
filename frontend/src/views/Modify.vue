<template>
  <div class="modify-page">
    <Layout :loaded="loaded">
      <div class="container loading-in">
        <MarkdownModHead ref="info" id="info" :article="article" />
        <MarkdownCom ref="content" :article="article" />
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
import { computed, defineComponent, onMounted, ref } from "vue";
import Layout from "@/layouts/index.vue";
import MarkdownCom from "@/components/Markdown/MarkdownCom.vue";
import MarkdownModHead from "@/components/Markdown/MarkdownModHead.vue";

import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router";
import { message } from "ant-design-vue";

import { init, modify } from "@/controller/Modify/modify";
import Article from "@/models/Article";
import ArticleInfo from "@/models/ArticleInfo";
import { useStore } from "vuex";

export default defineComponent({
  name: "Modify",
  components: {
    Layout,
    MarkdownCom,
    MarkdownModHead,
  },
  setup() {
    const info = ref();
    const content = ref();
    const router = useRouter();
    const route = useRoute();
    const article = ref<Article>();
    const store = useStore();
    const confirm = () => {
      message.success("confirm");
      const articleInfo: ArticleInfo = info.value.info;
      const articleContent: string = content.value.rawStr;
      modify(route, articleInfo, articleContent, router, store);
    };

    const saveContent = (e: KeyboardEvent) => {
      if (e.key === "s" && e.ctrlKey === true) {
        e.preventDefault();
        message.warning("修改页面无法保存");
      }
    };

    onMounted(async () => {
      document.addEventListener("keydown", saveContent);
      article.value = await init(route);
    });

    onBeforeRouteLeave(() => {
      document.removeEventListener("keydown", saveContent);
    });

    const loaded = computed((): boolean => {
      if (article.value) {
        return true;
      }
      return false;
    });

    const cancel = () => {
      router.back();
    };
    return {
      info,
      content,
      confirm,
      cancel,
      loaded,
      article,
    };
  },
});
</script>

<style scoped lang="scss">
.modify-page {
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
