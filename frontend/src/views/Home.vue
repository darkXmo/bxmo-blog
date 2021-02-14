<template>
  <div class="home-page">
    <Layout>
      <Hero />
      <div class="content">
        <div class="articles">
          <ArticleList v-if="ifHomeAritlces" :articles="homeArticles.value"/>
        </div>
      </div>
    </Layout>
  </div>
</template>

<script lang="ts">
// 引入Vue组件或vue模块
import Hero from '@/components/Hero.vue';
import ArticleList from '@/components/List/ArticleList.vue';
import { computed, defineComponent } from 'vue';
import Layout from "@/layouts/index.vue";

// 引入model组件
import ArticleItemList from '@/models/ArticleItemList';

// 引入controller组件
import init from "@/controller/Home/initHomeArticleList";

/**
 * 首页
 */
export default defineComponent({
  name: 'HomePage',
  components: {
    Layout,
    Hero,
    ArticleList
  },
  setup() {
    const homeArticles: ArticleItemList = init();
    const ifHomeAritlces = computed((): boolean => {
      return homeArticles.value.length > 0;
    });
    return {
      homeArticles,
      ifHomeAritlces
    };
  }
});
</script>

<style lang="scss">
.home-page {
  .content {
    >.articles {
      padding: $item-list-padding;
    }
  }
}
</style>