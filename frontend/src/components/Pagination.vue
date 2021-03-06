<template>
  <a-pagination
    v-model:current="current"
    :total="total"
    :show-total="(total) => `共 ${total} 项`"
  />
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
// import { useRoute } from "vue-router";
export default defineComponent({
  props: {
    total: {
      type: Number,
      required: true,
    },
  },
  setup() {
    const current = computed((): number => {
      // const route = useRoute();
      // console.log(route);
      return 0;
    });

    return {
      current,
    };
  },
});
</script>
