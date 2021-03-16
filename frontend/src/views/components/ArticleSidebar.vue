<template>
  <div class="article-sidebar">
    <ul class="sidebar-links">
      <li>
        <section class="sidebar-group">
          <p class="siderbar-heading">标题</p>
          <ul class="sidebar-links sidebar-group-items">
            <li>
              <a href="" class="sidebar-link">123</a>
            </li>
          </ul>
        </section>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ArticleSidebar",
});
</script>

<style scoped lang="scss">
$side-bar-ul-padding: 1.5rem 0;

.article-sidebar {
  font-size: 16px;
  width: 20rem;
  position: fixed;
  bottom: 0;
  z-index: 10;
  margin: 0;
  top: 4rem;
  left: 0;
  box-sizing: border-box;
  border-right: $border-default;
  overflow-y: auto;
  overflow-x: hidden;
  background: rgb(237, 237, 237);
  background: linear-gradient(
    180deg,
    rgb(237, 237, 237) 0%,
    rgb(255, 255, 255) 1%
  );

  > .sidebar-links {
    padding: $side-bar-ul-padding;
    section {
      p {
        color: #2c3e50;
        transition: color 0.15s ease;
        font-size: 1.1em;
        font-weight: 700;
        padding: 0.35rem 1.5rem 0.35rem 1.25rem;
        width: 100%;
        box-sizing: border-box;
        margin: 0;
        border-left: 0.25rem solid transparent;
      }

      ul > li > a.sidebar-link {
        font-size: 1em;
        font-weight: 400;
        color: #2c3e50;
        border-left: 0.25rem solid transparent;
        padding: 0.35rem 1rem 0.35rem 2rem;
        line-height: 1.4;
        width: 100%;
        box-sizing: border-box;

        &:hover {
          color: $nav-hover-color !important;
        }
      }
    }
  }
}
</style>
