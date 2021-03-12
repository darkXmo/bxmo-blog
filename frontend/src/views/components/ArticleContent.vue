<template>
  <div class="article-content">
    <div class="content">
      <h1>{{ title }}</h1>
      <div class="markdowned-area" v-html="content"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Article from "@/models/Article";
import { computed, defineComponent, PropType } from "vue";
import transformMarkdown from "@/controller/Publish/transformMarkdown";

export default defineComponent({
  name: "ArticleContent",
  props: {
    article: Object as PropType<Article>,
  },
  setup(props) {
    const title = computed((): undefined | string => {
      return props.article?.title;
    });
    const content = computed((): undefined | string => {
      const rawStr = props.article?.content;
      if (typeof rawStr == "string") {
        return transformMarkdown(rawStr);
      }
      return "";
    });
    return {
      title,
      content,
    };
  },
});
</script>

<style scoped lang="scss">
.article-content {
  > .content {
    max-width: 960px;
    margin: 0 auto;
    padding: 2rem 2.5rem;
  }
}
</style>
