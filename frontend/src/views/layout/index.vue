<template>
  <div class="page-layout">
    <TopNavigator></TopNavigator>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

import TopNavigator from '@/components/TopNavigator.vue';

export default defineComponent({
  name: 'PageLayout',
  components: {
    TopNavigator
  }
});

</script>

<style scoped lang="scss">
.page-layout {

}
</style>