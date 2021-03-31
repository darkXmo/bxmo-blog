<template>
  <a-button
    class="go-publish"
    shape="circle"
    size="large"
    type="primary"
    title="发布"
    @click="goPublish"
  >
    <EditTwoTone twoToneColor="#ffffff" />
  </a-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { EditTwoTone } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "GoPublish",
  components: {
    EditTwoTone,
  },
  setup() {
    const router = useRouter();
    const goPublish = () => {
      router.push({
        name: "Publish",
      });
    };
    return {
      goPublish,
    };
  },
});
</script>

<style scoped lang="scss">
.go-publish {
}
</style>
