<template>
  <div class="check-page">
    <h1>{{ year }}</h1>
    <a-button @click="inc">INC</a-button>
    <a-button @click="dec">DEC</a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue";

export default defineComponent({
  name: "CheckPage",
  setup() {
    const year: Ref = ref(2021);
    const inc: Function = () => {
      year.value += 1;
    };
    const dec: Function = () => {
      year.value -= 1;
    };

    return {
      year,
      inc,
      dec,
    };
  },
});
</script>

<style scoped lang="scss">
.check-page {
}
</style>
