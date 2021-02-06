<template>
  <div class="home">
    <Layout></Layout>
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
