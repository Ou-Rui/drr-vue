<template>
  <div>
    <el-container>
      <el-main>
        <doc-search-bar @search="onSearch($event)"></doc-search-bar>
        <doc-scroll-page :docs="docs"></doc-scroll-page>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import DocSearchBar from "@/components/doc/DocSearchBar";
  import DocScrollPage from "@/components/doc/DocScrollPage";
  import {getDocsByFilter} from "@/api/doc";

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
        },
        docs: [
        ]
      }
    },
    methods: {
      onSearch(searchForm) {
        this.filter.title = searchForm.title
        this.filter.categoryId = searchForm.category.id
        this.filter.tagIds = searchForm.tags.map((tag) => {
          return tag.id
        })
        this.getDocsByFilter()
      },
      getDocsByFilter() {
        getDocsByFilter(this.filter).then((data) => {
          this.docs = data.data
        }).catch((error) => {
          if (error !== 'error') {
            this.$message({message: error, type: 'error', showClose: true});
          }
        })
      }
    },
    mounted() {
      this.getDocsByFilter()
    }
  }
</script>

<style scoped>

</style>
