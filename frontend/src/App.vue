<template>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Ubuntu,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

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

  .ant-card-hoverable {
    cursor: inherit;
  }

  .horizontal-line {
    height: 2px;
    width: 100%;
    background: $border-default-color;
  }

  .hover-underline {
    position: relative;
    &::after {
      transition: $transition;
      position: absolute;
      content: '';
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

  

</style>
