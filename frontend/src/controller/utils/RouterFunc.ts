import { RouteLocationNormalizedLoaded, Router } from "vue-router";

export const goModify = (
  router: Router,
  route: RouteLocationNormalizedLoaded
) => {
  router.push({
    name: "Modify",
    params: {
      id: route.params.id,
    },
  });
};

export default (router: Router): void => {
  router.go(-1);
};
