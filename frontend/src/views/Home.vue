<template>
  <div class="home-page">
    <Layout>
      <Hero />
      <div class="container">
        <div class="articles">
          <ArticleList
            v-if="ifHomeAritlces"
            class="loading-in"
            :articles="homeArticles.value"
          />
          <Pagination
            v-if="ifHomeAritlces"
            :total="homeArticles.value.length"
          />
        </div>
        <div class="information">
          <SiteInfomation
            v-if="ifSiteInfo"
            :siteInfo="siteInfo"
            class="loading-in"
          />
        </div>
      </div>
      <div class="fix-button">
        <LoginModal v-if="!logined" />
        <LogoutConfirm v-else />
        <GoPublish v-if="logined" />
      </div>
    </Layout>
  </div>
</template>

<script lang="ts">
// 引入Vue组件或vue模块
import Hero from "@/components/Hero.vue";
import ArticleList from "@/components/List/ArticleList.vue";
import { computed, defineComponent, onMounted, reactive } from "vue";
import Layout from "@/layouts/index.vue";
import Pagination from "@/components/Pagination.vue";
import LoginModal from "@/components/Modal/LoginModal.vue";
import GoPublish from "@/components/Button/GoPublish.vue";
import LogoutConfirm from "@/components/Confirm/LogoutConfirm.vue";

// 引入model组件
import ArticleItemList from "@/models/ArticleItemList";
import SiteInfo from "@/models/SiteInfo";

// 引入controller组件
import {
  initArticles,
  initSiteInfo,
} from "@/controller/Home/initHomeArticleList";
import SiteInfomation from "@/components/SiteInfomation.vue";
import { Store, useStore } from "vuex";
import { RootState } from "@/store/types";
import { message } from "ant-design-vue";
import { MessageType } from "ant-design-vue/lib/message";

/**
 * 首页
 */
export default defineComponent({
  name: "HomePage",
  components: {
    Layout,
    Hero,
    ArticleList,
    SiteInfomation,
    Pagination,
    LogoutConfirm,
    LoginModal,
    GoPublish,
  },
  setup() {
    const homeArticles: ArticleItemList = reactive({ value: [] });
    let loading: MessageType;
    onMounted(() => {
      loading = message.loading(
        "正在加载数据，如果未使用代理访问本网站，可能加载失败",
        0
      );
    });
    initArticles().then((res) => {
      homeArticles.value = res.value;
      if (loading) loading();
    });
    const siteInfo: SiteInfo = initSiteInfo();
    const ifHomeAritlces = computed((): boolean => {
      return homeArticles.value.length > 0;
    });
    const ifSiteInfo = computed((): boolean => {
      return siteInfo.owner.length > 0;
    });
    const store: Store<RootState> = useStore();
    const logined = computed((): boolean => {
      return store.getters["user/logined"];
    });
    return {
      homeArticles,
      ifHomeAritlces,
      siteInfo,
      ifSiteInfo,
      logined,
    };
  },
});
</script>

<style lang="scss">
.home-page {
  .container {
    display: flex;
    align-items: flex-start;
    margin: 20px auto 0;
    min-height: 100vh;
    max-width: 1260px;
    > .articles {
      flex: auto;
      padding: $page-content-padding;
      margin-right: $page-content-gap;

      > .ant-pagination {
        display: flex;
        float: right;
      }
    }
    > .information {
      box-sizing: border-box;
      flex: 0 0 300px;

      padding: $page-content-padding;
    }
  }
}
</style>
