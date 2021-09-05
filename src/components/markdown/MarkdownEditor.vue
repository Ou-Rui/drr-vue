<template>
  <mavon-editor v-model="editor.value"
                ref="md"
                v-bind="editor">
  </mavon-editor>
</template>

<script>
  import {mavonEditor} from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'

  export default {
    name: "MarkdownEditor",
    props: {
      editor: Object
    },
    data() {
      return {
      }
    },
    components: {
      mavonEditor
    },
    mounted() {
      this.$set(this.editor, 'ref', this.$refs.md)
    }
  }
</script>

<style scoped>

</style>
