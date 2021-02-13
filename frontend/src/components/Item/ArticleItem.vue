<template>
  <div class="article-item">
    <a-card>
      <h3>
        {{title}}
      </h3>
      <h4>
        {{abstract}}
      </h4>
      <h5>
        {{date}}
      </h5>
    </a-card>
  </div>
</template>


<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

import ArticleItem from '@/models/ArticleItem';

export default defineComponent({
  name: 'ArticleItem',
  props: {
    value: { 
      type: Object as PropType<ArticleItem>,
      required: true
    }
  },
  setup(props) {
    const title = ref<string>(props.value.title);
    const abstract = ref<string>(props.value.abstract);
    const date = ref<string>(props.value.date.toString().substring(0, 10));
    return {
      title,
      abstract,
      date
    };
  }
});

</script>

<style scoped lang="scss">
.article-item {

}
</style>