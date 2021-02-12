import { articleListReq } from "@/api/homeReq";

export default articleListReq.then((res) => {
  console.log(res);
}).catch((err) => {
  console.log(err);
});