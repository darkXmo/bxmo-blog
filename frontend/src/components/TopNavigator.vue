<template>
  <div class="top-navigator">
    <div class="left">
      <!-- 网站图标和名称 -->
      <a href="/" class="flex-align-center">
        <img
          class="site-icon"
          src="@/assets/img/icon.jpeg"
          width="48"
          height="48"
          alt="网站图标"
        />
        <span class="site-name">{{ siteName }}</span>
      </a>
    </div>
    <div class="right flex-align-center">
      <!-- 网站内外链接导航栏 -->
      <NavLink link="Home" :inPage="true">
        <HomeFilled />
        <span>Home</span>
      </NavLink>
      <NavLink link="https://github.com/darkXmo">
        <GithubFilled />
        <span>Github</span>
      </NavLink>
      <NavLink link="https://gitee.com/dXmo">
        <IconFont type="icon-gitee" />
        <span>Gitee</span>
      </NavLink>
      <NavLink link="https://dxmo.gitee.io/">
        <HistoryOutlined />
        <span>Blog-v1</span>
      </NavLink>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  HomeFilled,
  GithubFilled,
  HistoryOutlined,
} from "@ant-design/icons-vue";
import IconFont from "@/controller/utils/Icon";

import NavLink from "./NavLink.vue";

/**
 * 页面顶部导航栏，包括左侧的网页icon和右边的一些到git的跳转。
 */
export default defineComponent({
  name: "TopNavigator",
  components: {
    NavLink,
    HomeFilled,
    GithubFilled,
    HistoryOutlined,
    IconFont,
  },
  setup() {
    const SITE_NAME = "B-Xmo";
    const siteName = ref<string>(SITE_NAME);

    return {
      siteName,
    };
  },
});
</script>

<style scoped lang="scss">
.top-navigator {
  position: sticky;
  top: 0;
  height: 64px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  border-bottom: $border-default;
  > div {
    display: flex;
    &.left {
      > a {
        > img.site-icon {
          height: 3rem;
          width: 3rem;
          border-radius: 25%;
          margin-left: 2.5rem;
          margin-right: 1.5rem;
        }

        > span {
          align-self: center;
          font-size: 1.2rem;
        }
      }
    }

    &.right {
      > * {
        margin-right: 1.5rem;
      }
    }
  }
}
</style>
