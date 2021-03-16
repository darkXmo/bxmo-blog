<template>
  <div class="new-book" @click="showModal">
    <PlusOutlined />
    <span>新书</span>
    <a-modal
      v-model:visible="visible"
      title="新增书目"
      @ok="handleOk"
      ok-text="确认"
      cancel-text="取消"
    >
      <div class="content" style="display: flex">
        <a-input
          id="newBook"
          v-model:value="input"
          placeholder="请输入书名"
        ></a-input>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { PlusOutlined } from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "NewBook",
  components: {
    PlusOutlined,
  },
  emits: ["confirm"],
  setup(_, context) {
    const newBook = ref<string>("");
    const visible = ref<boolean>(false);
    const input = ref<string>("");
    const showModal = () => {
      visible.value = true;
    };
    const handleOk = () => {
      visible.value = false;
      context.emit("confirm", input.value);
    };
    return {
      newBook,
      showModal,
      visible,
      handleOk,
      input,
    };
  },
});
</script>

<style scoped lang="scss">
.new-book {
  padding: 4px 8px;
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
    transition: $transition;
    background: $hover-color;
  }

  > :first-child {
    margin-right: 0.4rem;
  }

  > :nth-child(2) {
    cursor: pointer;
  }
}
</style>
