<template>
  <div class="page-footer flex-align-center">
    <p class="flex-align-center technology">
      <IconFont type="icon-vue" />
      <span>Vue3.0</span>
      <IconFont type="icon-typescript"/>
      <span>Typescript</span>
      <IconFont type="icon-project" />
      <span>工程化实践</span>
      <CopyrightCircleFilled />
      <span>Xmo 2021</span>
    </p>
    
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import IconFont from '@/controller/utils/Icon';
import { CopyrightCircleFilled } from '@ant-design/icons-vue';

/**
 * 页面的 Footer 部分
 */
export default defineComponent({
  name: 'PageFooter',
  components: {
    IconFont,
    CopyrightCircleFilled
  }
});

</script>

<style scoped lang="scss">
.page-footer {
  flex-direction: column;
  box-sizing: border-box;
  justify-content: center;
  border-top: $border-default;
  padding: 1rem;

  font-weight: 500;

  >.technology {
    >.anticon {
      font-size: 1.5rem;
      margin-right: 0.2rem;
    }
    >span:nth-child(2n):not(:last-child) {
      margin-right: 10px;
    }
  }
}
</style>