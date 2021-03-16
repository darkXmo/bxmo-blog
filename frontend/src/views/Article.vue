<template>
  <div class="article-page">
    <Layout :loaded="loaded">
      <ArticleSidebar class="loading-in" :article="article" />
      <ArticleContent class="content loading-in" :article="article" />
    </Layout>
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
export default defineComponent({
  name: "ArticlePage",
  components: {
    Layout,
    ArticleSidebar,
    ArticleContent,
  },
  setup() {
    const route = useRoute();
    const article = ref<Article>();
    onMounted(() => {
      if (typeof route.params.id == "string") {
        const id: number = parseInt(route.params.id);
        getArticle(article, id);
      }
    });
    const loaded = computed((): boolean => {
      console.log(article.value);
      if (article.value) {
        return true;
      }
      return false;
    });
    return {
      article,
      loaded,
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
