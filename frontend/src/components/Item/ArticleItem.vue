<template>
  <div class="article-item">
    <a-card>
      {{value.title}}
    </a-card>
  </div>
</template>


<script lang="ts">
import { defineComponent, PropType } from 'vue';

import ArticleItem from '@/models/ArticleItem';

export default defineComponent({
  name: 'ArticleItem',
  props: {
    value: Object as PropType<ArticleItem>
  },
  setup(props) {
    const title: string | undefined = props.value?.title;
    return {
      title
    };
  }
});

</script>

<style scoped lang="scss">
.article-item {

}
</style>