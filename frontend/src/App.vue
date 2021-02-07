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

  

}
svg {
  color: $svg-default-color !important;
}

  

</style>
