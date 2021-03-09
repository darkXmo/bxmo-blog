<template>
  <a-popconfirm
    title="确定登出？"
    ok-text="登出"
    cancel-text="取消"
    @confirm="confirm"
    @cancel="cancel"
  >
    <GoLogout />
  </a-popconfirm>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { message } from "ant-design-vue";
import GoLogout from "../Button/GoLogout.vue";

export default defineComponent({
  name: "LogoutConfirm",
  components: {
    GoLogout,
  },
  setup() {
    const confirm = (e: MouseEvent) => {
      console.log(e);
      message.success("确认登出");
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
