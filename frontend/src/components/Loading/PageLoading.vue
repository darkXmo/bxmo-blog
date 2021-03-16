<template>
  <div class="page-loading">
    <a-spin size="large" />
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageLoading",
});
</script>

<style scoped>
.page-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 95vh;
}
</style>
