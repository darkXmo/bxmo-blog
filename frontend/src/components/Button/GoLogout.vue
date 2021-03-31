<template>
  <a-button class="go-logout" shape="circle" size="large" title="登出">
    <LogoutOutlined />
  </a-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { LogoutOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  name: "GoLogout",
  components: {
    LogoutOutlined,
  },
});
</script>

<style scoped lang="scss">
.go-logout {
}
</style>
