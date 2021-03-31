<template>
  <div class="delete-article-modal">
    <GoDelete @click="showModal" />
    <a-modal
      title="删除该页博文"
      v-model:visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleSubmit"
    >
      确认要
      <strong style="color: red">"删除<DeleteOutlined />"</strong> 该篇博文？
    </a-modal>
  </div>
</template>

<script lang="ts">
import Article from "@/models/Article";
import { DeleteOutlined } from "@ant-design/icons-vue";
import { defineComponent, PropType, ref } from "vue";
import { deleteArticle } from "@/controller/Article/deleteArticle";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import GoDelete from "../Button/GoDelete.vue";

export default defineComponent({
  name: "DeleteArticleModal",
  props: {
    article: {
      type: Object as PropType<Article>,
      required: true,
    },
  },
  components: {
    GoDelete,
    DeleteOutlined,
  },
  setup(props) {
    const visible = ref<boolean>(false);
    const showModal = (): void => {
      visible.value = true;
    };
    const confirmLoading = ref<boolean>(false);
    const store = useStore();
    const router = useRouter();
    const handleSubmit = async (): Promise<void> => {
      const id = props.article.id;
      confirmLoading.value = true;
      if (id) {
        await deleteArticle(id, store);
        visible.value = false;
        confirmLoading.value = false;
        router.back();
      }
    };
    return {
      visible,
      showModal,
      confirmLoading,
      handleSubmit,
    };
  },
});
</script>

<style scoped lang="scss">
.delete-article-modal {
}
</style>
