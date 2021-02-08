<template>
  <div class="home">
    <Layout>
      <h1>
        Content - 2021-02-08 22:03
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
