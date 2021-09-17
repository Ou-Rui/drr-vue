<template>
  <scroll-page :loading="loading" :is-empty="isEmpty" :offset="offset">
    <doc-card v-for="doc in docs" :key="doc.id" v-bind="doc">
    </doc-card>
  </scroll-page>
</template>

<script>

  import DocCard from "@/components/doc/DocCard";
  import ScrollPage from "@/components/common/ScrollPage";

  export default {
    name: "DocScrollPage",
    props : {
      offset: {
        type: Number,
        default: 100
      }
    },
    data() {
      return {
        loading: false,
        isEmpty: false,
        docs: [],
      }
    },
    methods: {

    },
    components: {
      ScrollPage,
      DocCard,
    },
  }
</script>

<style scoped>

</style>
