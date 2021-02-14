<template>
  <div class="article-item">
    <h3 class="title">
      <span class="hover-underline">
        {{title}}
      </span>
    </h3>
    <div class="abstract">
      <h4>Abstract</h4>
      <p class="abstract">
        {{abstract}}
      </p>
    </div>
    <div class="horizontal-line"></div>
    <div class="information">
      <h5 class="author">
        <Iconfont type="icon-author" />
        <span>
          {{author}}
        </span>
      </h5>
      <h5 class="date">
        <Iconfont type="icon-date" />
        <span>
          {{date}}
        </span>
      </h5>
      <h5 class="tags">
        <TagsFilled />
        <span v-for="item in tags" :key="item.value" class="tag hover-underline">
          {{item.value}}
        </span>
      </h5>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, PropType, reactive, ref } from 'vue';

import ArticleItem from '@/models/ArticleItem';
import Tag from '@/models/Tag';
import { TagsFilled } from '@ant-design/icons-vue';

import Iconfont from '@/controller/utils/Icon';

/**
 * 文章项（由标题，概述和文章属性构成），该组件设置文章项的结构。
 */
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
    const author = ref<string>(props.value.author);
    const tags: Array<Tag> = reactive(props.value.tags);
    return {
      title,
      abstract,
      date,
      author,
      tags
    };
  },
  components: {
    TagsFilled,
    Iconfont
  }
});

</script>

<style scoped lang="scss">
.article-item {
  box-shadow: $box-shadow;
  transition: $transition;
  border-radius: $item-radius;
  padding: $item-padding;
  &:hover {
    box-shadow: $box-shadow-hover;
  }

  >h3.title {
    font-size: 1.5rem;
    font-weight: $default-title-weight;
    color: $article-title-color;

    &:hover {
      cursor: pointer;
    }
  }

  >div.abstract {
    position: relative;
    background-color: $abstract-background-color;
    text-align: left;
    padding: $abstract-padding;

    margin-bottom: $item-gap;

    h4 {
      color: $abstract-title-color;
    }

    p {
      white-space: pre-line;
    }

    &::before {
      position: absolute;
      content: '';
      top: 0;
      left: 0;
      width: 6px;
      height: 100%;
      background-color: $bar-color;
    }
  }

  >div.information {
    margin-top: $item-gap;
    display: grid;
    grid-template-columns: repeat(3, 1fr);    
    h5 {
      font-size: 1rem;
      color: $svg-default-color;
      >span {
        margin-left: 5px;
      }
      &.tags {

        >.tag {
          margin-right: 5px;
          
        }
      }
      margin-right: 15px;
    }
  }
  
}
</style>