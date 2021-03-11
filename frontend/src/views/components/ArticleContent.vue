<template>
  <div class="article-content">
    <div class="content">
      <h1>{{ title }}</h1>
    </div>
  </div>
</template>

<script lang="ts">
import Article from "@/models/Article";
import { computed, defineComponent, PropType } from "vue";

export default defineComponent({
  name: "ArticleContent",
  props: {
    article: Object as PropType<Article>,
  },
  setup(props) {
    const title = computed((): undefined | string => {
      return props.article?.title;
    });
    return {
      title,
    };
  },
});
</script>

<style scoped lang="scss">
.article-content {
  > .content {
    max-width: 740px;
    margin: 0 auto;
    padding: 2rem 2.5rem;
  }
}
</style>
