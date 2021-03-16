<template>
  <div class="markdown-head">
    <div class="title">
      <label for="title">标题</label>
      <a-input
        v-model:value="title"
        placeholder="博文标题"
        size="large"
        id="title"
      />
    </div>
    <div class="attrs">
      <label for="category">分类</label>
      <a-select
        v-model:value="category"
        placeholder="点击选择分类"
        id="category"
        style="width: 20vw"
        ref="select"
      >
        <a-select-option
          v-for="item in categoryList"
          :value="item"
          :key="item"
          >{{ item }}</a-select-option
        >
      </a-select>
      <label for="tags">标签</label>
      <a-input
        v-model:value="tags"
        placeholder="博文标签，用 | 分割，例如 'vue|react'"
        id="tags"
      />
    </div>
    <div class="abstract">
      <label for="abstract">概述</label>
      <a-textarea id="abstract" v-model:value="abstract"></a-textarea>
    </div>
  </div>
</template>

<script lang="ts">
import ArticleInfo from "@/models/ArticleInfo";
import Tag from "@/models/Tag";
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  name: "MarkdownHead",
  setup() {
    const title = ref<string>("");
    const category = ref<string>("前端");
    const tags = ref<string>("");
    const abstract = ref<string>("");

    const categoryList: Array<string> = ["前端", "后端", "运维", "闲事", "AI"];

    const tagsList = computed(
      (): Array<Tag> => {
        const ans = tags.value
          .split("|")
          .filter((value) => {
            return value !== "";
          })
          .map((value) => {
            return { value: value.trim() };
          });
        return ans;
      }
    );

    const info = computed(
      (): ArticleInfo => {
        return {
          title: title.value,
          category: category.value,
          tags: tagsList.value,
          date: new Date(),
          author: "Xmo",
          abstract: abstract.value,
        };
      }
    );

    return {
      title,
      category,
      tags,
      categoryList,
      info,
      abstract,
    };
  },
});
</script>

<style scoped lang="scss">
.markdown-head {
  > * {
    margin-bottom: 1rem;
  }
  label {
    white-space: nowrap;
    margin: 0 1rem;
    font-weight: bold;
  }
  > .title {
    display: flex;
    align-items: center;
  }
  > .attrs {
    display: flex;
    align-items: center;
  }

  > .abstract {
    display: flex;
    > #abstract {
      height: 11vh;
    }
  }
}
</style>
