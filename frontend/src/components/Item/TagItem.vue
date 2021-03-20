<template>
  <span
    class="tag-item"
    :style="`background-color: ${randomColor(80, 40, 0.8)}`"
  >
    {{ item.value }}
  </span>
</template>

<script lang="ts">
import { randomColor } from "@/controller/utils/Random";
import { Tag } from "@/models";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "TagItem",
  props: {
    item: {
      type: Object as PropType<Tag>,
      required: true,
    },
  },
  setup() {
    return {
      randomColor,
    };
  },
});
</script>

<style scoped lang="scss">
span.tag-item {
  font-size: $small-span;
  transition: $transition;
  margin: $attr-item-gap;
  border-radius: $item-radius;
  padding: 0.1rem 0.4rem;
  display: flex;
  color: #ffffff;
  margin-right: 0.2rem;
  &:hover {
    cursor: pointer;
    transform: scale(1.04);
  }
}
</style>
