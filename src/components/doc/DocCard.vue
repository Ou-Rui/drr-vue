<template>
  <el-card>
    <div slot="header">
      <a @click="docView(id)">{{title}}</a>
    </div>

    <div slot="body">
      {{summary}}
    </div>

    <div>
      <el-tag v-for="t in tagArray" :key="t" size="mini" type="success">{{t}}</el-tag>
      <span class="me-pull-right me-article-count">
	    	<i class="el-icon-time"></i>&nbsp;{{createTime}}
	    </span>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: "DocItem",
    props: {
      id: Number,
      title: String,
      summary: String,
      category: String,
      tags: String,
      createTime: String,
    },
    data() {
      return {

      }
    },
    computed: {
        tagArray: function () {
          return this.tags.split(',')
        }
    },
    methods: {
      // 跳转到文章页面
      docView(id) {
        this.$router.push({path: `/doc/view/${id}`})
      }
    },
  }
</script>

<style scoped>

</style>
