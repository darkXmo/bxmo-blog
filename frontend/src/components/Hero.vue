<template>
  <div class="hero flex-align-center">
    <div class="title-motto">
      <h1>Blog of Xmo</h1>
      <h3>乱石穿空，惊涛拍岸，卷起千堆雪</h3>
      <h3>江山如画，一时多少豪杰</h3>
    </div>
    <!-- <a href="https://www.pixiv.net/artworks/68818298" class="avatar">
      <img src="@/assets/picture/LS-full.jpg" alt="头像 @wube+岚少" title="@wube + 岚少，点击跳转作品源链接">
    </a> -->
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Hero',
});

</script>

<style scoped lang="scss">
.hero {
  padding: 150px 0;
  justify-content: space-around;
  background-image: url('../assets/picture/hero-background.jpg');
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
    >h3 {
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