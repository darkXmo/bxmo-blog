<template>
  <div class="publish-page">
    <Layout>
      <div class="container">
        <MarkdownCom />
      </div>
    </Layout>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Layout from "@/layouts/index.vue";
import MarkdownCom from "@/components/markdown/MarkdownCom.vue";

export default defineComponent({
  name: "PublishPage",
  components: {
    Layout,
    MarkdownCom,
  },
});
</script>

<style scoped lang="scss">
.publish-page {
  .container {
    padding: 20px;
    height: 70vh;
  }
}
</style>
