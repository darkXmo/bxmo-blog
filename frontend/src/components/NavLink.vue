<template>
  <div class="nav-link flex-align-center">
    <!-- 传入一个icon和一个span -->
    <div @click="jump">
      <slot></slot>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'NavLink',
  props: {
    /**
     * 跳转的链接，如果是站内地址则应该是 RouterName
     */
    link: {
      type: String,
      required: true,
      default: '/'
    },
    /**
     * 是否是站内链接
     */
    inPage: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const router = useRouter();
    const jump: Function = () => {
      if (props.inPage) {
        router.push({
          name: props.link
        });
      }
      else {
        window.open(props.link);
      }
    };

    return {
      jump
    };
  }
});

</script>

<style scoped lang="scss">
.nav-link {
  line-height: 1.4rem;
  >div {
    font-weight: $default-span-weight;
    >:first-child {
      margin-right: 5px;
    }

    &:hover {
      transition: .2s ease-in-out;
      cursor: pointer;
      color: $nav-hover-color;
      position: relative;
      &::after {
        position: absolute;
        content: '';
        bottom: -1px;
        width: 100%;
        left: 0;
        height: 2px;
        background-color: $nav-hover-color;
      }
    }
  }
  
      
}
</style>