<template>
  <div>
    <el-main>
      <div>
        <h1 class="doc-view-title">{{doc.title}}</h1>
        <div class="doc-view-category">
          文章分类：
          <el-button>
            {{doc.category}}
          </el-button>
        </div>
        <div>
          <markdown-editor :editor="doc.editor"></markdown-editor>
        </div>
      </div>

    </el-main>
  </div>
</template>

<script>
  import {getDocById} from "@/api/doc";
  import MarkdownEditor from "@/components/markdown/MarkdownEditor";

  export default {
    name: "DocView",
    components: {
      MarkdownEditor
    },
    data() {
      return {
        doc: {
          id: '',
          title: '',
          summary: '',
          createTime: '',
          tags: [],
          category:{},
          editor: {
            value: '',
            toolbarsFlag: false,
            subfield: false,
            defaultOpen: 'preview'
          }
        }
      }
    },
    methods: {
      getDoc() {
        let that = this
        getDocById(that.$route.params.id).then((data) => {
          Object.assign(that.doc, data.data)
          that.doc.editor.value = data.data.content
        }).catch(error => {
          if (error !== 'error') {
            that.$message({type: 'error', message: '文章加载失败', showClose: true})
          }
        })

      }
    },
    created() {
      this.getDoc()
    },
  }
</script>

<style scoped>

</style>
