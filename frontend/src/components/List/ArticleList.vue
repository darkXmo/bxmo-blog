<template>
  <div class="article-list">
    <ul>
      <li v-for="item in articles" :key="item.title">
        <ArticleItem :value="item"/>
      </li>
    </ul>
  </div>
</template>


<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue';

import ArticleItemList from '@/models/ArticleItemList';
import ArticleItem from '../Item/ArticleItem.vue';

export default defineComponent({
  name: 'ArticleList',
  props: {
    articles: {
      type: Object as PropType<ArticleItemList>,
      required: true
    }
  },
  setup(props) {
    console.log(props.articles);
    const articleItemList: ArticleItemList = reactive(props.articles);

    return {
      articleItemList
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