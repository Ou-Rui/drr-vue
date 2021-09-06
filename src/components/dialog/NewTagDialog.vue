<template>
  <el-dialog :visible.sync="visible" title="新建分类">

    <el-form :model="tagForm" ref="tagForm" :rules="rules">

      <el-form-item label="名称" prop="name">
        <el-input v-model="tagForm.name" placeholder="分类名称"></el-input>
      </el-form-item>

      <el-form-item label="描述" prop="description">
        <el-input v-model="tagForm.description" placeholder="分类描述"
                  type="textarea" :row="3"></el-input>
      </el-form-item>

    </el-form>
    <!--  el-dialog的具名组件footer  -->
    <div slot="footer">
      <el-button @click="onCancel()">取消</el-button>
      <el-button type="primary" @click="onConfirm('tagForm')">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {publishNewTag} from "@/api/tag";

export default {
  name: "NewTagDialog",
  props: {
    visible: Boolean
  },
  data() {
    return {
      tagForm: {
        id: '',
        name: '',
        description: '',
      },
      rules: {
        name : [
          {required: true, message: "请输入标签名称", trigger: "change"},
          {max: 10, message: "标签名称最多为30字符", trigger: "change"}
        ],
        description : [
          {required: true, message: "请输入标签描述", trigger: "change"},
          {max: 80, message: "分类名称最多为80字符", trigger: "change"}
        ]
      },
    }
  },
  methods: {
    // 取消，隐藏Dialog，清空Form
    onCancel() {
      this.$emit('close-tag-dialog')
      this.tagForm.id = ''
      this.tagForm.name = ''
      this.tagForm.description = ''
    },
    onConfirm(tagForm) {
      this.$refs[tagForm].validate((valid) => {
        if (valid) {
          let newTag = {
            id: '',
            name: this.tagForm.name,
            description: this.tagForm.description
          }
          let loading = this.$loading({
            lock: true,
            text: "发布中，请稍后..."
          })
          publishNewTag(newTag).then(() => {
            loading.close()
            this.$message({message: "发布成功"})
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
