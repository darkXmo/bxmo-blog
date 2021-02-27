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
        <div class="category-item" v-for="item in categories" :key="item.value">
          <span class="category-value">{{ item.value }}</span>
          <span
            class="category-amount"
            :style="`background-color: ${randomColor(70, 45, 0.8)}`"
            >{{ item.amount }}</span
          >
        </div>
      </div>
    </div>

    <div class="horizontal-line" />

    <div class="tags">
      <div class="type">
        <IconFont type="icon-category" />
        <h4>标签</h4>
      </div>
      <div class="tag-list">
        <span
          class="tag-item"
          v-for="item in tags"
          :key="item.value"
          :style="`background-color: ${randomColor(80, 40, 0.8)}`"
          >{{ item.value }}</span
        >
      </div>
    </div>

    <div class="horizontal-line" />

    <div class="friend-links">
      <div class="type">
        <IconFont type="icon-friendLink" />
        <h4>友链</h4>
      </div>
      <div class="friend-link-list">
        <div
          class="friend-link-item hover-underline"
          v-for="item in friendLinks"
          :key="item.value"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import SiteInfo from "@/models/SiteInfo";
import Category from "@/models/Category";
import Tag from "@/models/Tag";
import FriendLink from "@/models/FriendLink";

import IconFont from "@/controller/utils/Icon";

import { randomColor } from "@/controller/utils/Random";

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

    const friendLinks = computed(
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
      friendLinks,
      randomColor,
    };
  },
});
</script>

<style scoped lang="scss">
.site-information {
  $item-gap: 0.3rem;

  div.type {
    padding: 1rem 1rem 0.5rem 0;

    > * {
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
    svg {
      font-size: $svg-default-size;
    }
    padding-bottom: 1rem;
    > div.category-list {
      > div.category-item {
        font-weight: 500;
        margin: 0.5rem 0;
        display: flex;
        justify-content: space-between;
        border-radius: $item-radius;
        box-shadow: $box-shadow;
        padding: 0.4rem 0.8rem;

        transition: $transition;

        &:hover {
          cursor: pointer;
          transform: scale(1.04);
        }

        > span.category-value {
          color: $nav-hover-color;
        }

        > span.category-amount {
          font-size: 0.9rem;
          align-items: center;
          color: #ffffff;
          display: flex;
          width: 1.6rem;
          height: 1.6rem;
          justify-content: center;
          border-radius: $item-radius;
        }
      }
    }
  }
  > div.tags {
    > .tag-list {
      padding-bottom: 1rem;
      display: flex;
      flex-wrap: wrap;
      > .tag-item {
        font-size: $small-span;
        transition: $transition;
        margin: $item-gap;
        border-radius: $item-radius;
        padding: 0.1rem 0.4rem;
        display: flex;
        color: #ffffff;
        margin-right: 0.2rem;
        &:hover {
          cursor: pointer;
          transform: scale(1.04);
        }
      }
    }
  }

  > div.friend-links {
    > div.friend-link-list {
      display: flex;

      > div.friend-link-item {
        margin: $item-gap;
        box-shadow: $box-shadow;
        padding: 0.1rem 0.4rem;
        transition: $transition;

        &:hover {
          cursor: pointer;
          transform: scale(1.04);
        }
      }
    }
  }
}
</style>
