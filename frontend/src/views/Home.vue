<template>
  <div class="home">
    <Layout>
      <h1>
        Content - 2021-02-10 00:33
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
