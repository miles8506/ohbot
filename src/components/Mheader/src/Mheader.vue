<template>
  <header class="m_header">
    <slot name="header_left"></slot>
    <slot name="header_right"></slot>
  </header>
</template>

<script>
export default {
  setup() {
    return {};
  }
};
</script>

<style lang="less" scoped>
@import './less/header.less';
</style>
