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

    <div class="category">
      <div class="type">
        <IconFont type="icon-category" />
        <h4>分类</h4>
      </div>
      <div class="category-list">
        <CategoryItem
          v-for="item in categories"
          :key="item.value"
          :item="item"
        />
      </div>
    </div>

    <div class="horizontal-line" />

    <div class="tags">
      <div class="type">
        <TagsFilled />
        <h4>标签</h4>
      </div>
      <div class="tag-list">
        <TagItem v-for="item in tags" :key="item.value" :item="item" />
      </div>
    </div>

    <div class="horizontal-line" />

    <div class="friend-links">
      <div class="type">
        <IconFont type="icon-friendLink" />
        <h4>友链</h4>
      </div>
      <div class="friend-link-list">
        <FriendLinkItem
          v-for="item in friendLinks"
          :key="item.value"
          :item="item"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CategoryItem from "./Item/CategoryItem.vue";
import TagItem from "./Item/TagItem.vue";
import FriendLinkItem from "./Item/FriendLinkItem.vue";
import { TagsFilled } from "@ant-design/icons-vue";

import { computed, defineComponent, PropType, ref } from "vue";
import SiteInfo from "@/models/SiteInfo";
import Category from "@/models/Category";
import { Tag } from "@/models";
import FriendLink from "@/models/FriendLink";

import IconFont from "@/controller/utils/Icon";

export default defineComponent({
  name: "SiteInfomation",
  props: {
    siteInfo: {
      type: Object as PropType<SiteInfo>,
      required: true,
    },
  },
  components: {
    IconFont,
    CategoryItem,
    TagItem,
    FriendLinkItem,
    TagsFilled,
  },
  setup(props) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const avatarUrl = ref(require("@/assets/img/LS.jpeg"));

    const owner = computed((): string => {
      return props.siteInfo.owner;
    });

    const articleAmount = computed((): number => {
      return props.siteInfo.article_amount;
    });

    const tagAmount = computed((): number => {
      return props.siteInfo.tags.length ?? 0;
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

    const friendLinks = computed(
      (): Array<FriendLink> => {
        return props.siteInfo.friend_links;
      }
    );

    return {
      avatarUrl,
      owner,
      articleAmount,
      tagAmount,
      categories,
      tags,
      friendLinks,
    };
  },
});
</script>

<style scoped lang="scss">
.site-information {
  $item-gap: 0.3rem;

  div.type {
    font-size: 1rem;
    font-weight: 500;
    padding: 1rem 1rem 0.5rem 0;

    > * {
      display: inline-block;
      padding-right: 0.2rem;
    }

    > h4 {
      display: inline;
    }
  }

  > .avatar {
    padding: 1rem;
    display: flex;
    justify-content: center;
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
    text-align: center;
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

  > div.category {
    padding-bottom: 1rem;
  }
  > div.tags {
    > .tag-list {
      padding-bottom: 1rem;
      display: flex;
      flex-wrap: wrap;
    }
  }

  > div.friend-links {
    > div.friend-link-list {
      display: flex;
    }
  }
}
</style>
