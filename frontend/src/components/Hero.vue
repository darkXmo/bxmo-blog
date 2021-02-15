<template>
  <div class="hero flex-align-center">
    <div class="title-motto">
      <h1>{{blogTitle}}</h1>
      <h2>{{blogMotto}}</h2>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue';

/**
 * 首页展示页内容 - 就那个大大的 Blog of Xmo，可调参数包括'标题'和'座右铭'
 */
export default defineComponent({
  name: 'Hero',
  setup() {
    const BLOG_TITLE = 'Blog of Xmo';
    const BLOG_MOTTO = '乱石穿空，惊涛拍岸，卷起千堆雪\n江山如画，一时多少豪杰';
    
    const blogTitle = ref<string>(BLOG_TITLE);
    const blogMotto = ref<string>(BLOG_MOTTO);

    return {
      blogTitle,
      blogMotto
    }
  }
});

</script>

<style scoped lang="scss">
.hero {
  padding: 150px 0;
  justify-content: space-around;
  background-image: url('../assets/img/hero-background.jpeg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  .title-motto {
    // width: 400px;
    >* {
      color: white;
    }
    >h1 {
      font-size: 2.5rem;
    }
    >h2 {
      white-space: pre-line;
      font-size: 1.5rem;
    }
  }

  a.avatar {
    display: flex;
    width: 200px;
    img {
      border-radius: 50%;
      width: 100%;
    }
  }
}
</style>