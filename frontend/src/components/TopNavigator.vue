<template>
  <div class="top-navigator">
    <div class="left">
      <!-- 网站图标和名称 -->
      <a href="/" class="flex-align-center">
        <img class="site-icon" src="@/assets/picture/icon.png" alt="网站图标">
        <span class="site-name">B-Xmo</span>
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
        <IconFont type="icon-gitee-fill-round"/>
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
import { defineComponent } from 'vue';
import HomeFilled from '@ant-design/icons-vue/HomeFilled';
import GithubFilled from '@ant-design/icons-vue/GithubFilled';
import HistoryOutlined from "@ant-design/icons-vue/HistoryOutlined";
import { createFromIconfontCN } from '@ant-design/icons-vue';
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2369994_py72j28tfv.js',
});

import NavLink from './NavLink.vue';

export default defineComponent({
  name: 'TopNavigator',
  components: {
    NavLink,
    HomeFilled,
    GithubFilled,
    HistoryOutlined,
    IconFont
  }
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
  >div {
    display: flex;
    &.left {
      >a {
        >img.site-icon {
          height: 3rem;
          margin-left: 2.5rem;
          margin-right: 1.5rem;
        }

        >span {
          align-self: center;
          font-size: 1.2rem;
        }
      }

    }

    &.right {
      >* {
        margin-right: 1.5rem;
      }
    }
  }
}
</style>