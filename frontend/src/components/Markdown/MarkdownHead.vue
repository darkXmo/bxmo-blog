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
        ref="categorySelect"
      >
        <a-select-option
          v-for="item in categoryList"
          :value="item"
          :key="item"
          >{{ item }}</a-select-option
        >
      </a-select>
      <label for="book">所属书目</label>
      <a-select
        v-model:value="book"
        placeholder="点击选择 书目"
        id="book"
        style="width: 20vw"
        ref="bookSelect"
      >
        <template #dropdownRender="{ menuNode: menu }">
          <v-nodes :vnodes="menu" />
          <a-divider style="margin: 4px 0" />
          <NewBook @confirm="addItem" />
        </template>
        <a-select-option v-for="item in bookList" :value="item" :key="item">{{
          item
        }}</a-select-option>
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
import { Tag } from "@/models";
import { computed, defineComponent, ref } from "vue";
import NewBook from "./components/NewBook.vue";

export default defineComponent({
  name: "MarkdownHead",
  components: {
    NewBook,
    VNodes: (_, { attrs }) => {
      return attrs.vnodes;
    },
  },
  setup() {
    const title = ref<string>("");
    const tags = ref<string>("");
    const abstract = ref<string>("");

    const categoryList = ref<Array<string>>([
      "前端",
      "后端",
      "运维",
      "闲事",
      "AI",
    ]);
    const bookList = ref<Array<string>>([
      "Vue3",
      "typescript",
      "ES+",
      "css",
      "日记",
    ]);

    const book = ref<string>(bookList.value[0]);
    const category = ref<string>(categoryList.value[0]);

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

    const addItem = (newBook: string) => {
      bookList.value.push(newBook);
    };

    return {
      book,
      title,
      category,
      tags,
      categoryList,
      info,
      abstract,
      bookList,
      addItem,
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

<style lang="scss"></style>
