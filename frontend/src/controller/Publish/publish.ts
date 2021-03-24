import { articlePublishReq } from "@/api/articleReq";
import { ArticleToPublish } from "@/models";
import ArticleInfo from "@/models/ArticleInfo";
import { RootState } from "@/store/types";
import { message } from "ant-design-vue";
import { Router } from "vue-router";
import { Store } from "vuex";

const publish = (
  info: ArticleInfo,
  content: string,
  router: Router,
  store: Store<RootState>
) => {
  const article: ArticleToPublish = Object.assign({ content }, info);
  const token: string = store.getters["user/token"];
  if (!article.book) {
    article.book = "无名书";
  }
  if (token) {
    articlePublishReq(article, token)
      .then((res) => {
        const data = res.data;
        message.success(`发表博文成功，博文ID${data.id}`);
        router.back();
      })
      .catch((err) => {
        if (err.response.status === 401) {
          message.error(`发表博文失败，失败信息：未授权 || 未登录`);
        } else {
          message.error(
            `发表博文失败，失败信息：${
              err.response?.data ?? err.response?.message ?? err.message ?? err
            }`
          );
        }
      })
      .finally(() => {
        window.localStorage.removeItem("article_info");
        window.localStorage.removeItem("article_content");
      });
  } else {
    message.error(`发表博文失败，失败信息：未授权 || 未登录`);
  }
};

export default publish;
