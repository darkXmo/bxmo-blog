<template>
  <div class="home">
    <Layout>
      <Hero />
      <div class="content">
        <ArticleList />
      </div>
    </Layout>
  </div>
</template>

<script lang="ts">
import Hero from '@/components/Hero.vue';
import ArticleList from '@/components/List/ArticleList.vue';
import { defineComponent, onMounted } from 'vue';
import Layout from "@/layouts/index.vue";

import init from "@/controller/Home/initHomeArticleList";

export default defineComponent({
  name: 'Home',
  components: {
    Layout,
    Hero,
    ArticleList
  },
  setup() {
    onMounted(() => {
      init;
    });
  }
});
</script>
