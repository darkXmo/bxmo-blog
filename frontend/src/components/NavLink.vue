<template>
  <div class="nav-link flex-align-center">
    <!-- 传入一个icon和一个span -->
    <div @click="jump" class="hover-underline">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

/**
 * 输入一个链接，通过设置 inPage 参数来判断是否是站内链接。
 */
export default defineComponent({
  name: "NavLink",
  props: {
    /**
     * 跳转的链接，如果是站内地址则应该是 RouterName
     */
    link: {
      type: String,
      required: true,
      default: "/",
    },
    /**
     * 是否是站内链接
     */
    inPage: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const router = useRouter();
    const jump: Function = () => {
      if (props.inPage) {
        router.push({
          name: props.link,
        });
      } else {
        window.open(props.link);
      }
    };

    return {
      jump,
    };
  },
});
</script>

<style scoped lang="scss">
.nav-link {
  line-height: 1.4rem;
  > div {
    font-weight: $default-title-weight;
    > :first-child {
      margin-right: 5px;
    }
  }
}
</style>
