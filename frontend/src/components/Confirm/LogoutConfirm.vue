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
import { Store, useStore } from "vuex";
import { RootState } from "@/store/types";
import { logout } from "@/controller/Login/login";

export default defineComponent({
  name: "LogoutConfirm",
  components: {
    GoLogout,
  },
  setup() {
    const store: Store<RootState> = useStore();
    const confirm = () => {
      message.success("确认登出");
      logout(store);
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
