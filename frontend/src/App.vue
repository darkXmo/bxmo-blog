<template>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Ubuntu, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Oxygen, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  h1,
  h2,
  h3 {
    text-align: center;
  }

  // 推荐输入animation-delay来进行设置延迟时间，实现按次序载入。
  .loading-in {
    @keyframes loadingin {
      from {
        transform: translateY(-3rem);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
    animation-name: loadingin;
    animation-duration: 0.5s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-fill-mode: backwards;
  }

  a {
    font-weight: 500;
    text-decoration: none;
    color: $font-default-color;
  }

  .flex-align-center {
    display: flex;
    align-items: center;
  }

  ul {
    list-style: none;
    padding-left: 0;
  }

  h3 {
    font-size: 1.5rem;
  }

  .ant-card-hoverable {
    cursor: inherit;
  }

  .horizontal-line {
    height: 2px;
    width: 100%;
    background: $border-default-color;
  }

  .default-card {
    box-shadow: $box-shadow;
    transition: $transition;
    border-radius: $item-radius;
    padding: $item-padding;
    &:hover {
      box-shadow: $box-shadow-hover;
    }
  }

  .hover-underline {
    position: relative;
    &::after {
      transition: $transition;
      position: absolute;
      content: "";
      bottom: -0.2rem;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 2px;
      background-color: $hover-color;
    }

    &:hover {
      cursor: pointer;
      color: $hover-color;
      &::after {
        width: 100%;
      }
    }
  }
}
svg {
  color: $svg-default-color !important;
}

pre.hljs {
  padding: 8px 2px;
  border-radius: 5px;
  position: relative;
  ol {
    list-style: decimal;
    margin: 0;
    margin-left: 40px;
    padding: 0;
    li {
      list-style: decimal-leading-zero;
      position: relative;
      padding-left: 10px;
      .line-num {
        position: absolute;
        left: -40px;
        top: 0;
        width: 40px;
        height: 100%;
        border-right: 1px solid rgba(0, 0, 0, 0.66);
        &::before {
          content: "";
          position: absolute;
          width: 3px;
          height: 2px;
          right: 9px;
          bottom: 7px;
          background-color: rgb(30, 30, 30);
        }
      }
    }
  }
  b.name {
    position: absolute;
    top: 2px;
    right: 12px;
    z-index: 10;
    color: #999;
    pointer-events: none;
  }
}
</style>
