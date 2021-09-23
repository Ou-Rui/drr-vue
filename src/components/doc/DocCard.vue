<template>
  <el-card>
    <div slot="header">
      <a @click="docView(doc.id)">{{doc.title}}</a>
    </div>

    <div slot="body">
      {{doc.summary}}
    </div>

    <div>
      <el-tag v-for="t in doc.tagItems" :key="t.id" size="mini" type="success">{{t.name}}</el-tag>
      <span class="me-pull-right me-article-count">
	    	<i class="el-icon-time"></i>&nbsp;{{doc.createTime}}
	    </span>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: "DocItem",
    props: {
      doc: Object
    },
    data() {
      return {

      }
    },
    computed: {

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
