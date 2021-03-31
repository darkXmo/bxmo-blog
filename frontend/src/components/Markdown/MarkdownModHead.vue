<template>
  <div class="markdown-mod-head">
    <div class="title">
      <label for="title">标题</label>
      <a-input
        autocomplete="off"
        v-model:value="title"
        placeholder="博文标题"
        size="large"
        id="title"
      />
    </div>
    <div class="attrs">
      <label for="author">作者</label>
      <a-input
        autocomplete="off"
        v-model:value="author"
        style="width: 22vw"
        placeholder="作者名"
        id="author"
      />
      <label for="category">分类</label>
      <a-select
        v-model:value="category"
        :disabled="true"
        placeholder="点击选择分类"
        id="category"
        style="width: 22vw"
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
        :disabled="true"
        id="book"
        style="width: 22vw"
        ref="bookSelect"
      >
        <a-select-option v-for="item in bookList" :value="item" :key="item">{{
          item
        }}</a-select-option>
      </a-select>
      <label for="tags">标签</label>
      <a-input
        autocomplete="off"
        :disabled="true"
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
import { computed, defineComponent, PropType, ref } from "vue";
import { Store, useStore } from "vuex";
import { RootState } from "@/store/types";
import { getTodayString } from "@/controller/utils/date";
import Article from "@/models/Article";

export default defineComponent({
  name: "MarkdownModHead",
  props: {
    article: {
      required: true,
      type: Object as PropType<Article>,
    },
  },
  components: {},
  setup(props) {
    console.log(props.article);
    const title = ref<string>(props.article.title);
    const tags = ref<string>(props.article.tags.join(" | "));
    const abstract = ref<string>(props.article.abstract);
    const author = ref<string>(props.article.author);

    const store: Store<RootState> = useStore();
    store.dispatch("site/fetchData");

    const categoryList = ref<Array<string>>([
      "前端",
      "后端",
      "运维",
      "闲事",
      "AI",
    ]);

    const bookList = computed(
      (): Array<string> => {
        return store.state.site?.books?.map((value) => value.book_title) ?? [];
      }
    );

    const book = ref<string>(bookList.value[0]);
    const category = ref<string>(categoryList.value[0]);

    const tagsList = computed(
      (): Array<string> => {
        const ans = tags.value
          .split("|")
          .filter((value) => {
            return value !== "";
          })
          .map((value) => {
            return value.trim();
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
          publish_date: getTodayString(),
          author: author.value,
          book: book.value,
          abstract: abstract.value,
        };
      }
    );

    return {
      book,
      title,
      author,
      category,
      tags,
      categoryList,
      info,
      abstract,
      bookList,
    };
  },
});
</script>

<style scoped lang="scss">
.markdown-mod-head {
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
