<template>
  <div class="home-page">
    <Layout>
      <Hero/>
      <div class="container">
        <div class="articles">
          <ArticleList v-if="ifHomeAritlces" class="loading-in" :articles="homeArticles.value"/>
        </div>
        <div class="information">
          <SiteInfomation class="loading-in"/>
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
import SiteInfomation from '@/components/SiteInfomation.vue';

/**
 * 首页
 */
export default defineComponent({
  name: 'HomePage',
  components: {
    Layout,
    Hero,
    ArticleList,
    SiteInfomation
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
  .container {
    display: flex;
    align-items: flex-start;
    margin: 20px auto 0;
    min-height: 100vh;
    max-width: 1260px;
    >.articles {
      
      flex: auto;
      padding: $page-content-padding;
      margin-right: $page-content-gap;
    }
    >.information {
      flex-shrink: 0;
      box-sizing: border-box;
      flex: 0 0 300px;

      padding: $page-content-padding;
    }
  }
  
}
</style>