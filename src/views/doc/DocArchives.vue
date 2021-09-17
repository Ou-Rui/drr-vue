<template>
  <div>
    <el-container>
      <el-main>
        <doc-search-bar></doc-search-bar>
        <doc-scroll-page :filter="filter"></doc-scroll-page>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import DocSearchBar from "@/components/doc/DocSearchBar";
  import DocScrollPage from "@/components/doc/DocScrollPage";

  export default {
    name: "DocArchives",
    components: {
      DocSearchBar,
      DocScrollPage,
    },
    data() {
      return {
        filter: {
          // categoryId: 1
        }
      }
    },
    methods: {

    },

  }
</script>

<style scoped>

</style>
