<template>
  <div class="article-list">
    <ul>
      <li v-for="item in articles.value" :key="item.title">
        <ArticleItem :value="{ }"/>
      </li>
    </ul>
  </div>
</template>


<script lang="ts">
import { defineComponent, reactive } from 'vue';

import ArticleItemList from '@/interfaces/ArticleItemList';
import ArticleItem from '../Item/ArticleItem.vue';

export default defineComponent({
  name: 'ArticleList',
  setup() {
    const articles: ArticleItemList = reactive({
      value: [{
        title: 'Vue3系列讲解',
        abstract: `
          1. Vue3相关新增和底层。
          2. 监听 html 标签
          3. 源视频
        `,
        author: 'Xmo',
        date: new Date(),
        tags: [{
          value: 'Vue'
        }, {
          value: '原理'
        }, {
          value: 'Vue3'
        }]
      }]
    });

    return {
      articles
    };
  },
  components: {
    ArticleItem
  }
});

</script>

<style scoped lang="scss">
.article-list {

}
</style>