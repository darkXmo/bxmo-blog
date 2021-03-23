<template>
  <div class="article-page">
    <Layout :loaded="loaded">
      <ArticleSidebar
        class="loading-in"
        :article="article"
        :book-articles="bookArticles"
      />
      <ArticleContent class="content loading-in" :article="article" />
    </Layout>
    <div class="fix-button">
      <LoginModal v-if="!logined" />
      <LogoutConfirm v-else />
      <GoPublish v-if="logined" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import Layout from "@/layouts/index.vue";
import ArticleSidebar from "./components/ArticleSidebar.vue";
import { useRoute } from "vue-router";
import { getArticle } from "@/controller/Article/getArticle";
import Article from "@/models/Article";
import ArticleContent from "./components/ArticleContent.vue";
import ArticleSimple from "@/models/ArticleSimple";
import LoginModal from "@/components/Modal/LoginModal.vue";
import GoPublish from "@/components/Button/GoPublish.vue";
import LogoutConfirm from "@/components/Confirm/LogoutConfirm.vue";
import { Store, useStore } from "vuex";
import { RootState } from "@/store/types";

export default defineComponent({
  name: "ArticlePage",
  components: {
    Layout,
    ArticleSidebar,
    ArticleContent,
    LogoutConfirm,
    LoginModal,
    GoPublish,
  },
  setup() {
    const route = useRoute();
    const article = ref<Article>();
    const bookArticles = ref<Array<ArticleSimple>>();
    const store: Store<RootState> = useStore();
    const logined = computed((): boolean => {
      return store.getters["user/logined"];
    });
    onMounted(() => {
      if (typeof route.params.id == "string") {
        const id: number = parseInt(route.params.id);
        getArticle(article, id, bookArticles);
      }
    });
    const loaded = computed((): boolean => {
      if (article.value) {
        return true;
      }
      return false;
    });
    return {
      article,
      loaded,
      bookArticles,
      logined,
    };
  },
});
</script>

<style scoped lang="scss">
.article-page {
  .content {
    margin-left: 20rem;
    min-height: 85vh;
  }
}
</style>
