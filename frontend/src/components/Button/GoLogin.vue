<template>
  <a-button class="go-login" shape="circle" size="large" title="登录">
    <LoginOutlined />
  </a-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { LoginOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  name: "GoLogin",
  components: {
    LoginOutlined,
  },
});
</script>

<style scoped lang="scss">
.go-login {
}
</style>
