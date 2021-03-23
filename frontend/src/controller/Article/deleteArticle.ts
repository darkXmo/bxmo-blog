import { deleteArticleReq } from "@/api/articleReq";
import { RootState } from "@/store/types";
import { message } from "ant-design-vue";
import { Store } from "vuex";

export const deleteArticle = async (id: number, store: Store<RootState>) => {
  const token: string = store.getters["user/token"];
  if (token) {
    await deleteArticleReq(id, token)
      .then((res) => {
        message.success(`删除文章 ID${res.data}`);
      })
      .catch((err) => {
        message.error(`${err.response.message ?? err.message ?? err}`);
      });
  } else {
    message.error("未登录，禁止删除文章");
  }
};
