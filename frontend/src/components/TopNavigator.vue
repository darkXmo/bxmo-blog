<template>
  <div class="top-navigator">
    <div class="left">
      <!-- 网站图标和名称 -->
      <a href="/">
        <img class="site-icon" src="@/../public/icon.png" alt="网站图标">
        <span class="site-name">B-Xmo</span>
      </a>
    </div>
    <div class="right">

    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TopNavigator',
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
  border-bottom: 1px solid #eaecef;
  >div {
    display: flex;
    &.left {
      >a {
        display: flex;
        align-items: center;
        >img.site-icon {
          height: 3rem;
          margin-left: 40px;
          margin-right: 30px;
        }

        >span {
          align-self: center;
          font-size: 1.2rem;
      }
      }

    }
  }
}
</style>