import { articleListReq } from "@/api/homeReq";
import ArticleItemList from "@/models/ArticleItemList";
import { reactive } from "vue";

export default () => {
  const homeArticles: ArticleItemList = reactive({value: []});
  articleListReq.then((res) => {
    homeArticles.value = res.data.articles;
  }).catch((err) => {
    console.log(err);
  });

  return homeArticles;

};