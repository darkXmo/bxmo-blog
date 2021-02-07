<template>
  <div class="home">
    <Layout>
      <h1>
        Content
      </h1>
    </Layout>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from "./layout/index.vue";

export default defineComponent({
  name: 'Home',
  components: {
    Layout
  },
});
</script>
