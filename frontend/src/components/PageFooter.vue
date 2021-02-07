<template>
  <div class="page-footer flex-align-center">
    <!-- 使用技术链接 -->
    <!-- 版权归属 -->
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageFooter',
});

</script>

<style scoped lang="scss">
.page-footer {
  box-sizing: border-box;
  border-top: $border-default;

  font-weight: 500;
}
</style>