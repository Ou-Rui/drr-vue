<template>
  <el-dialog :visible="visible" title="新建分类" :show-close="false">

    <el-form :model="categoryForm" ref="categoryForm" :rules="rules">

      <el-form-item label="名称" prop="name">
        <el-input v-model="categoryForm.name" placeholder="分类名称"></el-input>
      </el-form-item>

      <el-form-item label="描述" prop="description">
        <el-input v-model="categoryForm.description" placeholder="分类描述"
                  type="textarea" :row="3"></el-input>
      </el-form-item>

    </el-form>
    <!--  el-dialog的具名组件footer  -->
    <div slot="footer">
      <el-button @click="onCancel()">取消</el-button>
      <el-popconfirm title="确认提交？">
        <el-button slot="reference" type="primary"
                   @click="onConfirm('categoryForm')">确认</el-button>
      </el-popconfirm>

    </div>
  </el-dialog>
</template>

<script>
import {publishNewCategory} from "@/api/category";

export default {
  name: "NewCategoryDialog",
  props: {
    visible: Boolean
  },
  data() {
    return {
      categoryForm: {
        id: '',
        name: '',
        description: '',
      },
      rules: {
        name : [
          {required: true, message: "请输入分类名称", trigger: "change"},
          {max: 10, message: "分类名称最多为30字符", trigger: "change"}
        ],
        description : [
          {required: true, message: "请输入分类描述", trigger: "change"},
          {max: 80, message: "分类名称最多为80字符", trigger: "change"}
        ]
      },
    }
  },
  methods: {
    // 取消，隐藏Dialog，清空Form
    onCancel() {
      this.$emit('close-category-dialog')
      this.categoryForm.id = ''
      this.categoryForm.name = ''
      this.categoryForm.description = ''
    },
    onConfirm(categoryForm) {
      this.$refs[categoryForm].validate((valid) => {
        if (valid) {
          let newCategory = {
            id: '',
            name: this.categoryForm.name,
            description: this.categoryForm.description
          }
          let loading = this.$loading({
            lock: true,
            text: "发布中，请稍后..."
          })
          publishNewCategory(newCategory).then(() => {
            loading.close()
            this.$message({message: "发布成功"})
            this.onCancel()
          }).catch((error) => {
            loading.close();
            if (error !== 'error') {
              this.$message({message: error, type: 'error', showClose: true});
            }
          });
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
