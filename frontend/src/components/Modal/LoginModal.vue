<template>
  <div class="login-modal">
    <a-button class="go-login" shape="circle" size="large" @click="showModal">
      <LoginOutlined />
    </a-button>
    <a-modal
      title="登录"
      v-model:visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleSubmit"
    >
      <LoginForm ref="loginForm" />
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRaw } from "vue";
import { LoginOutlined } from "@ant-design/icons-vue";
import { Store, useStore } from "vuex";
import { login } from "@/controller/Login/login";
import { RootState } from "@/store/types";
import LoginForm from "../Form/LoginForm.vue";
import { ValidateErrorEntity } from "node_modules/ant-design-vue/lib/form/interface";
import LoginFormModal from "@/models/LoginForm";
import { LoginFormComponent } from "@/components";

export default defineComponent({
  name: "LoginModal",
  components: {
    LoginOutlined,
    LoginForm,
  },
  setup() {
    const loginForm = ref();
    const visible = ref<boolean>(false);
    const showModal = (): void => {
      visible.value = true;
    };
    const confirmLoading = ref<boolean>(false);
    const store: Store<RootState> = useStore();
    const handleSubmit = (): void => {
      confirmLoading.value = true;
      const form: LoginFormComponent = loginForm.value;
      form
        .onSubmit()
        .then(() => {
          login(store, toRaw(form.formData));
        })
        .catch((error: ValidateErrorEntity<LoginFormModal>) => {
          console.warn("error", error);
        })
        .finally(() => {
          visible.value = false;
          confirmLoading.value = false;
        });
    };
    return {
      loginForm,
      visible,
      showModal,
      confirmLoading,
      handleSubmit,
    };
  },
});
</script>

<style scoped lang="scss">
.login-modal {
}
</style>
