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
import { defineComponent } from 'vue';

import TopNavigator from '@/components/TopNavigator.vue';
import PageFooter from '@/components/PageFooter.vue';

export default defineComponent({
  name: 'PageLayout',
  components: {
    TopNavigator,
    PageFooter
  }
});

</script>

<style scoped lang="scss">
.page-layout {

}
</style>