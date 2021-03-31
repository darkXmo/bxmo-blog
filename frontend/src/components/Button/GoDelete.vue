<template>
  <a-button
    class="go-delete"
    shape="circle"
    size="large"
    type="danger"
    title="删除"
    @click="showModal"
  >
    <DeleteOutlined />
  </a-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { DeleteOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  name: "GoDelete",
  components: {
    DeleteOutlined,
  },
});
</script>

<style scoped lang="scss">
.go-delete {
}
</style>
