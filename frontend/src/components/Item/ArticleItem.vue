<template>
  <div class="article-item default-card">
    <h3 class="title" @click="goCheck">
      <span class="hover-underline">
        {{ title }}
      </span>
    </h3>
    <div class="abstract">
      <h4>Abstract</h4>
      <p class="abstract">
        {{ abstract }}
      </p>
    </div>
    <div class="horizontal-line"></div>
    <div class="information">
      <h5 class="author">
        <Iconfont type="icon-author" />
        <span>
          {{ author }}
        </span>
      </h5>
      <h5 class="date">
        <Iconfont type="icon-date" />
        <span>
          {{ date }}
        </span>
      </h5>
      <h5 class="tags">
        <TagsFilled />
        <span
          v-for="item in tags"
          :key="item.value"
          class="tag hover-underline"
        >
          {{ item.value }}
        </span>
      </h5>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";

import ArticleSimple from "@/models/ArticleSimple";
import { Tag } from "@/models";
import { TagsFilled } from "@ant-design/icons-vue";

import Iconfont from "@/controller/utils/Icon";
import { Router, useRouter } from "vue-router";

/**
 * 文章项（由标题，概述和文章属性构成），该组件设置文章项的结构。
 */
export default defineComponent({
  name: "ArticleItem",
  props: {
    value: {
      type: Object as PropType<ArticleSimple>,
      required: true,
    },
  },
  setup(props) {
    const title = computed((): string => {
      return props.value.title;
    });
    const abstract = computed((): string => {
      return props.value.abstract;
    });
    const date = computed((): string => {
      return props.value.publish_date;
    });
    const author = computed((): string => {
      return props.value.author;
    });
    const tags = computed(
      (): Array<Tag> => {
        return props.value.tags;
      }
    );
    const id = computed((): number => {
      return props.value.id ?? 0;
    });

    const router: Router = useRouter();
    const goCheck = () => {
      router.push({
        name: "Article",
        params: {
          id: id.value,
        },
      });
    };
    return {
      title,
      abstract,
      date,
      author,
      tags,
      goCheck,
    };
  },
  components: {
    TagsFilled,
    Iconfont,
  },
});
</script>

<style scoped lang="scss">
.article-item {
  > h3.title {
    font-weight: $default-title-weight;
    color: $article-title-color;
    margin: $article-item-title-margin;

    &:hover {
      cursor: pointer;
    }
  }

  > div.abstract {
    position: relative;
    background-color: $abstract-background-color;
    text-align: left;
    padding: $abstract-padding;

    margin-bottom: $item-gap;

    h4 {
      color: $abstract-title-color;
      font-size: $abstract-title-size;
    }

    p {
      white-space: pre-line;
    }

    &::before {
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      width: 6px;
      height: 100%;
      background-color: $bar-color;
    }
  }

  > div.information {
    margin-top: $item-gap;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    h5 {
      font-size: 1rem;
      color: $svg-default-color;
      > span {
        margin-left: 5px;
      }
      &.tags {
        > .tag {
          margin-right: 5px;
        }
      }
      margin-right: 15px;
    }
  }
}
</style>
