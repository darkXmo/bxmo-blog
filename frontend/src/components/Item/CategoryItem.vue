<template>
  <div class="category-item">
    <span class="category-value">{{ item.value }}</span>
    <span
      class="category-amount"
      :style="`background-color: ${randomColor(70, 45, 0.8)}`"
      >{{ item.article_amount }}</span
    >
  </div>
</template>

<script lang="ts">
import { randomColor } from "@/controller/utils/Random";
import Category from "@/models/Category";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "CategoryItem",
  props: {
    item: {
      type: Object as PropType<Category>,
      require: true,
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
div.category-item {
  font-weight: 500;
  margin: 0.5rem 0;
  display: flex;
  justify-content: space-between;
  border-radius: $item-radius;
  box-shadow: $box-shadow;
  padding: 0.4rem 0.8rem;

  transition: $transition;

  &:hover {
    cursor: pointer;
    transform: scale(1.04);
  }

  > span.category-value {
    color: $nav-hover-color;
  }

  > span.category-amount {
    font-size: 0.9rem;
    align-items: center;
    color: #ffffff;
    display: flex;
    width: 1.6rem;
    height: 1.6rem;
    justify-content: center;
    border-radius: $item-radius;
  }
}
</style>
