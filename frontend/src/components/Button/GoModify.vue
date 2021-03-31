<template>
  <a-button
    class="go-modify"
    shape="circle"
    size="large"
    type="primary"
    title="修改"
  >
    <DiffOutlined />
  </a-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { DiffOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  name: "GoModify",
  components: {
    DiffOutlined,
  },
});
</script>

<style scoped lang="scss">
.go-modify {
}
</style>
