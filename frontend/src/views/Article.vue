<template>
  <div class="article-page">
    <Layout>
      <ArticleSidebarVue />
    </Layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Layout from "@/layouts/index.vue";
import ArticleSidebarVue from "./components/ArticleSidebar.vue";
import { useRoute } from "vue-router";
import { getArticle } from "@/controller/Article/getArticle";
import Article from "@/models/Article";

export default defineComponent({
  name: "ArticlePage",
  components: {
    Layout,
    ArticleSidebarVue,
  },
  setup() {
    const route = useRoute();
    const article = ref<Article>();
    onMounted(() => {
      if (typeof route.params.id == "string") {
        const id: number = parseInt(route.params.id);
        getArticle(article, id);
        setTimeout(() => {
          console.log(article.value);
        }, 1000);
      }
    });
    return {};
  },
});
</script>

<style scoped lang="scss">
.article-page {
}
</style>
