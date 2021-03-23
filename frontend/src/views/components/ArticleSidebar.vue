<template>
  <div class="article-sidebar">
    <ul class="sidebar-links">
      <li>
        <section class="sidebar-group">
          <p class="siderbar-heading">{{ articleTitle }}</p>
          <ul class="sidebar-links sidebar-group-items">
            <li v-for="article in bookArticles" :key="article.id">
              <a :href="'/article/' + article.id + '#'" class="sidebar-link">{{
                article.title
              }}</a>
              <ul class="sidebar-sub-headers" v-if="article.id == id">
                <li
                  class="sidebar-sub-header"
                  v-for="item in sidebarLinks"
                  :key="item"
                >
                  <a class="sidebar-link" :href="path + '#' + item">{{
                    item
                  }}</a>
                </li>
              </ul>
            </li>
          </ul>
        </section>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  PropType,
  ref,
} from "vue";
import { articleAnchorInit } from "@/controller/Article/getArticle";
import { useRoute } from "vue-router";
import Article from "@/models/Article";
import ArticleSimple from "@/models/ArticleSimple";

export default defineComponent({
  name: "ArticleSidebar",
  props: {
    article: {
      type: Object as PropType<Article>,
      required: true,
    },
    bookArticles: {
      type: Object as PropType<Array<ArticleSimple>>,
      required: true,
    },
  },
  setup(props) {
    const sidebarLinks = ref<Array<string>>([]);
    const route = useRoute();
    const path = route.path;
    onMounted(() => {
      console.log(props.bookArticles);
      console.log(route);
      nextTick(() => {
        sidebarLinks.value = articleAnchorInit();
      });
    });
    const title = computed((): string => {
      return props.article.title;
    });
    const id = computed((): number => {
      return props.article.id ?? 0;
    });
    const articleTitle = computed((): string => {
      return props.article.book?.book_title ?? "";
    });
    return {
      id,
      path,
      sidebarLinks,
      title,
      articleTitle,
    };
  },
});
</script>

<style scoped lang="scss">
$side-bar-ul-padding: 1.5rem 0;

.article-sidebar {
  font-size: 16px;
  width: 20rem;
  position: fixed;
  bottom: 0;
  z-index: 10;
  margin: 0;
  top: 4rem;
  left: 0;
  box-sizing: border-box;
  border-right: $border-default;
  overflow-y: auto;
  overflow-x: hidden;
  background: rgb(237, 237, 237);
  background: linear-gradient(
    180deg,
    rgb(237, 237, 237) 0%,
    rgb(255, 255, 255) 1%
  );

  > .sidebar-links {
    padding: $side-bar-ul-padding;
    section {
      p {
        color: #2c3e50;
        transition: color 0.15s ease;
        font-size: 1.1em;
        font-weight: 700;
        padding: 0.35rem 1.5rem 0.35rem 1.25rem;
        width: 100%;
        box-sizing: border-box;
        margin: 0;
        border-left: 0.25rem solid transparent;
      }

      ul > li {
        > a.sidebar-link {
          font-size: 1em;
          font-weight: 400;
          color: #2c3e50;
          border-left: 0.25rem solid transparent;
          padding: 0.35rem 1rem 0.35rem 2rem;
          line-height: 1.4;
          width: 100%;
          box-sizing: border-box;

          &:hover {
            color: $nav-hover-color;
          }

          &:active {
            color: $hover-color;
          }
        }

        > .sidebar-sub-headers {
          padding-left: 1rem !important;
        }
      }
    }
  }
}
</style>
