<template>
  <span class="friend-link-item hover-underline">
    {{ item.name }}
  </span>
</template>

<script lang="ts">
import FriendLink from "@/models/FriendLink";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "FriendLinkItem",
  props: {
    item: {
      type: Object as PropType<FriendLink>,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
span.friend-link-item {
  margin: $attr-item-gap;
  box-shadow: $box-shadow;
  padding: 0.1rem 0.4rem;
  transition: $transition;

  &:hover {
    cursor: pointer;
    transform: scale(1.04);
  }
}
</style>
