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
      docs: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        loading: false,
        isEmpty: false,
      }
    },
    methods: {

    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>
