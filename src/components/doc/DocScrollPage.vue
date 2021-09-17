<template>
  <scroll-page :loading="loading" :is-empty="isEmpty" :offset="offset"
               v-on:load="load()">
    <doc-card v-for="doc in docs" :key="doc.id" v-bind="doc">
    </doc-card>
  </scroll-page>
</template>

<script>

  import DocCard from "@/components/doc/DocCard";
  import ScrollPage from "@/components/common/ScrollPage";

  import {getDocsByFilter} from "@/api/doc";

  export default {
    name: "DocScrollPage",
    components: {
      ScrollPage,
      DocCard,
    },
    props : {
      offset: {       // 页面偏置
        type: Number,
        default: 100
      },
      filter: {       // 筛选条件，默认为空
        type: Object,
        default() {
          return {

          }
        }
      }
    },
    data() {
      return {
        loading: false,
        isEmpty: false,
        docs: [
        ],
      }
    },
    methods: {
      load() {
        getDocsByFilter(this.filter).then((data) => {
          this.docs = data.data
        }).catch((error) => {
          if (error !== 'error') {
            this.$message({message: error, type: 'error', showClose: true});
          }
        })
      },
    },
    mounted() {
      this.load()
    }
  }
</script>

<style scoped>

</style>
