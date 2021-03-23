<template>
  <div class="page-layout">
    <nav>
      <TopNavigator />
    </nav>
    <transition name="mode-fade" mode="out-in">
      <div class="content" key="on" v-if="loaded">
        <slot></slot>
      </div>
      <PageLoading v-else key="off" />
    </transition>
    <footer>
      <PageFooter />
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, watchEffect } from "vue";

import TopNavigator from "@/components/TopNavigator.vue";
import PageFooter from "@/components/PageFooter.vue";
import PageLoading from "@/components/Loading/PageLoading.vue";
/**
 * 总的页面布局
 */
export default defineComponent({
  name: "PageLayout",
  props: {
    loaded: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    TopNavigator,
    PageFooter,
    PageLoading,
  },
  setup(props) {
    watchEffect(() => {
      if (props.loaded) {
        window.scroll(0, 0);
      }
    });
  },
});
</script>

<style scoped lang="scss">
.page-layout {
  min-width: 960px;
  nav {
    position: sticky;
    top: 0;
    background: white;
    z-index: 9;
    box-shadow: $box-shadow;
  }
}
</style>
<style lang="scss">
.page-layout svg {
  color: $svg-default-color;
}
</style>
