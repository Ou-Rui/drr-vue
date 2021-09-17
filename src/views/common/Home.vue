<template>
  <div id="home">
    <el-container direction="vertical">
      <!-- 绑定props的属性 -->
      <base-header :current-active-index=currentActiveIndex></base-header>

      <router-view/>
    </el-container>
  </div>
</template>

<script>
  import BaseHeader from "@/components/common/BaseHeader";

  export default {
    name: "Home",
    data() {
      return {
        currentActiveIndex: '/'
      }
    },
    components: {
      BaseHeader
    },
    // beforeRouteEnter中不能用this访问组件对象，因为还没有创建
    // 可以向next传入回调函数，在导航确认时，将以组件对象作为参数，执行该函数
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.currentActiveIndex = to.path;
      })
    }
  }
</script>

<style scoped>

</style>
