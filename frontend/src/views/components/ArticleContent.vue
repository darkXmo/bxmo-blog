<template>
  <div class="article-content">
    <div class="content">
      <h1 class="title">{{ title }}</h1>
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
      <div class="abstract">
        <h4>Abstract</h4>
        <p class="abstract">
          {{ abstract }}
        </p>
      </div>
      <div class="markdowned-area" v-html="content"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Article from "@/models/Article";
import { computed, defineComponent, PropType } from "vue";
import transformMarkdown from "@/controller/Publish/transformMarkdown";
import { Tag } from "@/models";

import { TagsFilled } from "@ant-design/icons-vue";

import Iconfont from "@/controller/utils/Icon";

export default defineComponent({
  name: "ArticleContent",
  props: {
    article: {
      type: Object as PropType<Article>,
      required: true,
    },
  },
  components: {
    TagsFilled,
    Iconfont,
  },
  setup(props) {
    const title = computed((): string => {
      return props.article?.title;
    });
    const content = computed((): string => {
      return transformMarkdown(props.article.content);
    });
    const author = computed((): string => {
      return props.article.author;
    });
    const date = computed((): string => {
      return props.article.date.toString().substring(0, 10);
    });
    const tags = computed(
      (): Array<Tag> => {
        return props.article.tags;
      }
    );
    const abstract = computed((): string => {
      return props.article.abstract;
    });

    return {
      title,
      content,
      author,
      date,
      tags,
      abstract,
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

    h1.title {
      font-size: 2.5rem;
      font-weight: 500;
      position: relative;
      &::before {
        position: absolute;
        bottom: -0.7rem;
        content: "";
        width: 100%;
        height: 2px;
        left: 0;
        background: $border-default-color;
      }
    }

    > div.information {
      margin-top: $item-gap;
      margin-bottom: 1rem;
      display: flex;
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
  }
}
</style>
