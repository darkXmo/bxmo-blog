<template>
  <div class="page-layout">
    <nav>
      <TopNavigator />
    </nav>
    <slot></slot>
    <footer>
      <PageFooter />
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import TopNavigator from "@/components/TopNavigator.vue";
import PageFooter from "@/components/PageFooter.vue";

/**
 * 总的页面布局
 */
export default defineComponent({
  name: "PageLayout",
  components: {
    TopNavigator,
    PageFooter,
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
