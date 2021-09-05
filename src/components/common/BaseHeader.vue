<template>
  <el-header>

      <el-menu :router=true menu-trigger="click" active-text-color="#5FB878"
               mode="horizontal" :default-active="currentActiveIndex">
        <el-menu-item index="/">HOME</el-menu-item>
        <el-submenu index="/doc">
          <template slot="title">DOC</template>
          <el-menu-item index="/doc/archives">Archives</el-menu-item>
          <el-menu-item index="/doc/new">New</el-menu-item>
        </el-submenu>
        <el-menu-item index="/album">Album</el-menu-item>
        <el-menu-item index="/about">About</el-menu-item>
      </el-menu>

  </el-header>
</template>

<script>
export default {
  name: "BaseHeader",
  props: {
    currentActiveIndex: String
  },
  data() {
    return {}
  }
}
</script>

<style scoped>

</style>
