<template>
  <div class="article-list">
    <ul>
      <li v-for="item in articles" :key="item.title">
        <ArticleItem :value="item" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";

import ArticleItemList from "@/models/ArticleItemList";
import ArticleItem from "../Item/ArticleItem.vue";

/**
 * 文章项（由标题，概述和文章属性构成）的列表，用在首页。
 */
export default defineComponent({
  name: "ArticleList",
  props: {
    articles: {
      type: Object as PropType<ArticleItemList>,
      required: true,
    },
  },
  setup(props) {
    const articleItemList = computed(() => {
      return props.articles;
    });

    return {
      articleItemList,
    };
  },
  components: {
    ArticleItem,
  },
});
</script>

<style scoped lang="scss">
.article-list {
  > ul {
    > *:not(:first-child) {
      margin: $item-align-margin 0;
    }
  }
}
</style>
