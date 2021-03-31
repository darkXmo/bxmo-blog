<template>
  <a-popconfirm
    title="修改本文章？"
    ok-text="修改"
    cancel-text="取消"
    @confirm="confirm"
    @cancel="cancel"
  >
    <GoModify />
  </a-popconfirm>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import GoModify from "../Button/GoModify.vue";
import { goModify } from "@/controller/utils/RouterFunc";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "ModifyConfirm",
  components: {
    GoModify,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const confirm = () => {
      goModify(router, route);
    };
    const cancel = (e: MouseEvent) => {
      console.log(e);
    };
    return {
      confirm,
      cancel,
    };
  },
});
</script>
