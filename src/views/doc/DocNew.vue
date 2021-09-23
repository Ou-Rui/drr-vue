<template>
    <el-main>
      <el-row>
        <el-col :span=4>
          <el-popconfirm placement="bottom" title="确认发布？" @confirm="onPublish('docForm')">
            <el-button slot="reference" id="button_publish" type="primary"
                       @click="">发布</el-button>
          </el-popconfirm>
        </el-col>
        <el-col :span=4>
          <el-button id="button_save">保存</el-button>
        </el-col>
        <el-col :span=4>
          <el-button id="button_cancel">取消</el-button>
        </el-col>
      </el-row>


      <div>
        <el-form :model="docForm" ref="docForm" :rules="rules">

          <el-form-item label="标题" prop="title">
            <el-input v-model="docForm.title" placeholder="标题"></el-input>
          </el-form-item>

          <el-form-item label="摘要" prop="summary">
            <el-input v-model="docForm.summary" placeholder="摘要"
                      type="textarea" :row="2"></el-input>
          </el-form-item>

          <el-form-item label="分类" prop="category">
            <el-select v-model="docForm.category" value-key="id" placeholder="文章分类">
              <el-option v-for="c in categories" :key="c.id" :label="c.name" :value="c"></el-option>
            </el-select>
            <el-button id="button_new_category" @click="newCategoryVisible=true">+</el-button>
          </el-form-item>

          <el-form-item label="标签" prop="tags">
            <el-select v-model="docForm.tags"
                       placeholder="文章标签"
                       multiple
                       value-key="id">
              <el-option v-for="t in tags" :key="t.id" :label="t.name" :value="t"></el-option>
            </el-select>
            <el-button id="button_new_tag" @click="newTagVisible=true">+</el-button>
          </el-form-item>

          <el-form-item label="正文" prop="content">
            <markdown-editor :editor="docForm.editor"></markdown-editor>
          </el-form-item>

        </el-form>
      </div>

      <NewCategoryDialog :visible="newCategoryVisible"
                         v-on:close-category-dialog="onCloseCategoryDialog()">
      </NewCategoryDialog>

      <NewTagDialog :visible="newTagVisible"
                    v-on:close-tag-dialog="onCloseTagDialog()">
      </NewTagDialog>
    </el-main>
</template>

<script>
  import MarkdownEditor from "@/components/markdown/MarkdownEditor";
  import NewCategoryDialog from "@/components/dialog/NewCategoryDialog";
  import NewTagDialog from "@/components/dialog/NewTagDialog";

  import {publishNewDoc} from "@/api/doc";
  import {getAllCategories} from "@/api/category";
  import {getAllTags} from "@/api/tag";

  export default {
    name: "New",
    data() {
      return {
        categories: [],
        tags: [],
        docForm: {      // 文章表单
          title: '',
          summary: '',
          category: {},
          tags: [],
          editor: {         // markdown 编辑器对象
            value: '',      // 保存文章的内容
            ref: '',        // 保存mavonEditor实例  实际不该这样
            default_open: 'edit',
            toolbars: {     // 配置工具栏的可视性
              bold: true, // 粗体
              italic: true, // 斜体
              header: true, // 标题
              underline: true, // 下划线
              strikethrough: true, // 中划线
              mark: true, // 标记
              superscript: true, // 上角标
              subscript: true, // 下角标
              quote: true, // 引用
              ol: true, // 有序列表
              ul: true, // 无序列表
              imagelink: true, // 图片链接
              code: true, // code
              fullscreen: true, // 全屏编辑
              readmodel: false, // 沉浸式阅读
              help: true, // 帮助
              undo: true, // 撤销
              redo: true, // 恢复
              trash: true, // 清空
              navigation: true, // 导航目录
              subfield: false, // 单双栏模式
              preview: true, // 预览
            }
          },
        },
        rules: {
          title : [
            {required: true, message: "请输入标题", trigger: "change"},
            {max: 30, message: "标题长度最多为30字符", trigger: "change"}
          ],
          summary : [
            {required: true, message: "请输入摘要", trigger: "change"},
            {max: 80, message: "标题长度最多为80字符", trigger: "change"}
          ],
          category : [
            {required: true, message: "请选择文章分类", trigger: "change"},
          ],
          tags : [
            {type: "array", required: true, message: "请选择文章标签", trigger: "change"},
          ],
          editor : [
            {type: "object", require: "true", fields: {
              value: [
                {required: "true", message: "请输入文章内容", trigger: "change"}
              ]
            }}
          ]
        },
        newCategoryVisible: false,
        newTagVisible: false,
      }
    },
    components: {
      MarkdownEditor,
      NewCategoryDialog,
      NewTagDialog,
    },
    methods: {
      onPublish(docForm) {
        this.$refs[docForm].validate((valid) => {
          console.log(valid)
          if (valid) {
            let newDoc = {
              id: '',           // 新文章无id
              title: this.docForm.title,
              summary: this.docForm.summary,
              categoryId: this.docForm.category.id,
              tags: [],
              content: this.docForm.editor.value,
              contentHtml: this.docForm.editor.ref.d_render
            }
            newDoc.tags = this.docForm.tags.map((tag) => {
              return {id: tag.id, name: tag.name};
            })
            let loading = this.$loading({
              lock: true,
              text: "发布中，请稍后..."
            })

            publishNewDoc(newDoc).then(() => {
              loading.close()
              this.$message({message: "发布成功"})
            }).catch((error) => {
              loading.close();
              if (error !== 'error') {
                this.$message({message: error, type: 'error', showClose: true});
              }
            });
          }
        });
      },
      // mounted时，获取所有分类的信息
      getAllCategories() {
        // 调用 @/api/category.js中的请求函数
        console.log("mounted中的getAllCategories")
        getAllCategories().then(data => {
          console.log("getAllCategories请求成功！")
          this.categories = data.data
        }).catch(error => {
          if (error !== 'error') {
            this.$message({type: 'error', message: '文章分类加载失败', showClose: true})
          }
        });
      },
      getAllTags() {
        getAllTags().then(data => {
          this.tags = data.data;
        }).catch(error => {
          if (error !== 'error') {
            this.$message({type: 'error', message: '文章标签加载失败', showClose: true})
          }
        });
      },
      onCloseCategoryDialog() {
        console.log("触发关闭分类对话框事件")
        this.newCategoryVisible = false;
        this.getAllCategories()      // 更新Categories信息
      },
      onCloseTagDialog() {
        console.log("触发关闭标签对话框事件")
        this.newTagVisible = false;
        this.getAllTags()      // 更新Tags信息
      },
    },
    // 页面加载完毕时，读取现有的分类、标签信息
    mounted() {
      this.getAllCategories()
      this.getAllTags()
    }
  }

</script>

<style scoped>

</style>
