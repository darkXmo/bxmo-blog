<template>
  <div class="site-information default-card">
    <div class="avatar">
      <a href="https://www.pixiv.net/artworks/68818298" class="avatar">
        <img
          :src="avatarUrl"
          alt="头像 @wube+岚少"
          title="@wube + 岚少，点击跳转作品源链接"
          height="128"
          width="128"
        />
      </a>
    </div>
    <div class="owner">
      <h3>{{ owner }}</h3>
    </div>
    <div class="amount">
      <div class="article-amount">
        <h3>{{ articleAmount }}</h3>
        <span>文章</span>
      </div>
      <div class="tag-amount">
        <h3>{{ tagAmount }}</h3>
        <span>标签</span>
      </div>
    </div>
    <div class="horizontal-line" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import SiteInfo from "@/models/SiteInfo";
import Category from "@/models/Category";
import Tag from "@/models/Tag";
import FriendLink from "@/models/FriendLink";

export default defineComponent({
  name: "SiteInfomation",
  props: {
    siteInfo: {
      type: Object as PropType<SiteInfo>,
      required: true,
    },
  },
  setup(props) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const avatarUrl = ref(require("@/assets/img/LS.jpeg"));

    const owner = computed((): string => {
      return props.siteInfo.owner;
    });

    const articleAmount = computed((): number => {
      return props.siteInfo.articleAmount;
    });

    const tagAmount = computed((): number => {
      return props.siteInfo.tagAmount;
    });

    const categories = computed(
      (): Array<Category> => {
        return props.siteInfo.categories;
      }
    );

    const tags = computed(
      (): Array<Tag> => {
        return props.siteInfo.tags;
      }
    );

    const friendLink = computed(
      (): Array<FriendLink> => {
        return props.siteInfo.friendLinks;
      }
    );

    return {
      avatarUrl,
      owner,
      articleAmount,
      tagAmount,
      categories,
      tags,
      friendLink,
    };
  },
});
</script>

<style scoped lang="scss">
.site-information {
  > .avatar {
    padding: 1rem;
    > a {
      > img {
        width: $avatar-width;
        height: $avatar-height;
        border-radius: $avatar-radius;
      }
    }
  }

  > .owner {
    padding: 1rem;
  }

  > .amount {
    padding-bottom: 1rem;
    width: 80%;
    padding-left: 1px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    > div:first-child {
      border-right: black 1px solid;
    }

    > div {
      > h3 {
        margin-bottom: 0.1rem;
      }
    }
  }
}
</style>
