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
import { defineComponent } from 'vue';
import Layout from "./layout/index.vue";

export default defineComponent({
  name: 'Home',
  components: {
    Layout,
    Hero,
    ArticleList
  },
});
</script>
