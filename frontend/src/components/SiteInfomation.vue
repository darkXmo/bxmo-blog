<template>
  <div class="site-information default-card">
    <div class="avatar">
      <a href="https://www.pixiv.net/artworks/68818298" class="avatar">
        <img :src="avatarUrl" alt="头像 @wube+岚少" title="@wube + 岚少，点击跳转作品源链接" height="915" width="915">
      </a>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, nextTick, onMounted, ref } from 'vue';

export default defineComponent({
  name: 'SiteInfomation',
  setup() {
    
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const avatarUrl = ref(require('@/assets/img/LS-comp.jpeg'));

    onMounted(() => {
      setTimeout(() => {
        avatarUrl.value = 'https://s3.ax1x.com/2021/02/16/y6x6v6.jpg';
      }, 100);
    });

    return {
      avatarUrl
    };
  }
});

</script>

<style scoped lang="scss">
.site-information {
  >.avatar {
    >a {
      >img {
        width: $avatar-width;
        height: $avatar-height;
        border-radius: $avatar-radius;
      }
    }
  }
}
</style>