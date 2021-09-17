<template>
  <div ref="scroll" id="scroll-page">
    <!-- 滚动主体，插槽形式  -->
    <slot></slot>

    <!--  加载模块   -->
    <div
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(245,245,245)">
    </div>
  </div>
</template>

<script>
export default {
  name: "ScrollPage",
  props: {
    loading: Boolean,     // 是否正在加载
    isEmpty: Boolean,     // 是否为空
    offset: Number        // 初始偏置 ？
  },
  data() {
    return {
      scrollAction: {       // 与上一位置的差分，用于判断滚动方向
        x: 'undefined',     // 字符串，非真正的undefined
        y: 'undefined',
      }
    }
  },
  methods: {
    // 滚动事件处理函数
    handleScroll() {
      let that = this
      if (!that.noData) {
        let curHeight = document.documentElement.scrollTop || document.body.scrollTop

        if ((curHeight + window.innerHeight >= that.$refs.scroll.offsetHeight + that.offset) && that.isDownDirection()) {
          if (!that.loading) {
            // 向父组件发送load事件
            that.$emit('load')
          }
        }
      }
    },
    // 判断滚动方向
    isDownDirection() {
      if (typeof this.scrollAction.x == 'undefined') {
        this.scrollAction.x = window.pageXOffset;
        this.scrollAction.y = window.pageYOffset;
      }
      let diffX = this.scrollAction.x - window.pageXOffset;
      let diffY = this.scrollAction.y - window.pageYOffset;

      this.scrollAction.x = window.pageXOffset;
      this.scrollAction.y = window.pageYOffset;

      if (diffX < 0) {
        // Scroll right
      } else if (diffX > 0) {
        // Scroll left
      } else if (diffY < 0) {
        // Scroll down
        return true
      } else if (diffY > 0) {
        // Scroll up
      } else {
        // First scroll event
      }
      return false
    },
  },


}
</script>

<style scoped>

</style>
