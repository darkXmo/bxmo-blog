import { articleGetReq, updateArticleReq } from "@/api/articleReq";
import { ArticleToModify } from "@/models";
import Article from "@/models/Article";
import ArticleInfo from "@/models/ArticleInfo";
import ArticleSimple from "@/models/ArticleSimple";
import { RootState } from "@/store/types";
import { message } from "ant-design-vue";
import { RouteLocationNormalizedLoaded, Router } from "vue-router";
import { Store } from "vuex";

export const init = async (
  route: RouteLocationNormalizedLoaded
): Promise<Article> => {
  const id = route.params.id;
  if (typeof id === "string") {
    return await articleGetReq(parseInt(id)).then((res) => {
      return res.data;
    });
  } else {
    throw new Error("Id not defined");
  }
};

export const modify = async (
  route: RouteLocationNormalizedLoaded,
  info: ArticleInfo,
  content: string,
  router: Router,
  store: Store<RootState>
): Promise<ArticleSimple | null> => {
  const id = route.params.id;
  const token: string = store.getters["user/token"];
  const article: ArticleToModify = Object.assign({ content }, info);
  if (typeof id === "string") {
    return await updateArticleReq(parseInt(id), article, token)
      .then((res) => {
        router.back();
        message.success(`${article.title} 修改成功`);
        return res.data;
      })
      .catch((err) => {
        message.error(
          `${
            err.response.data ??
            err.response?.message ??
            err.message ??
            err.data ??
            err
          }`
        );
        return null;
      });
  } else {
    throw new Error("Id not defined");
  }
};
