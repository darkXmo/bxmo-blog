<template>
  <a-form :model="formData" v-bind="layout" :rules="rules" ref="formRef">
    <a-form-item name="username">
      <a-input v-model:value="formData.username" placeholder="Username">
        <template #prefix
          ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
        /></template>
      </a-input>
    </a-form-item>
    <a-form-item name="password">
      <a-input
        v-model:value="formData.password"
        type="password"
        placeholder="Password"
        autocomplete="off"
      >
        <template #prefix
          ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
        /></template>
      </a-input>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { LoginFormComponent, Rules } from "@/components";
import LoginForm from "@/models/LoginForm";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { defineComponent, reactive, ref, UnwrapRef } from "vue";

export default defineComponent({
  setup() {
    const formRef = ref();
    const formData: UnwrapRef<LoginForm> = reactive({
      username: "",
      password: "",
    });
    const layout = {
      wrapperCol: { span: 24 },
    };
    const rules: Rules = {
      username: [
        { required: true, message: "Please input username", trigger: "blur" },
        { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
      ],
      password: [
        { required: true, message: "Please input password", trigger: "change" },
      ],
    };
    const onSubmit = (): Promise<null> => {
      return formRef.value.validate();
    };
    const comReturn: LoginFormComponent = {
      formRef,
      layout,
      formData,
      rules,
      onSubmit,
    };
    return comReturn;
  },
  components: {
    UserOutlined,
    LockOutlined,
  },
});
</script>
<style lang="scss"></style>
