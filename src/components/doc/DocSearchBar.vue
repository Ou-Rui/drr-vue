<template>
  <div>
    <el-form :model="searchForm" ref="searchForm" :rules="rules"
             label-position="left" label-width="50px">

      <el-row>
        <el-col :span="12">
          <el-form-item label="标题" prop="title">
            <el-input v-model="searchForm.title" placeholder="" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button id="button_search" @click="onSearch('searchForm')">搜索</el-button>
        </el-col>
      </el-row>


      <el-row>
        <el-col :span=6>
          <el-form-item label="分类" prop="category" class="category-form-item">
            <el-select v-model="searchForm.category" value-key="id"
                       placeholder="文章分类" clearable>
              <el-option v-for="c in categories" :key="c.id" :label="c.name" :value="c"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span=6>
          <el-form-item label="标签" prop="tags" class="tags-form-item">
            <el-select v-model="searchForm.tags"
                       placeholder="文章标签"
                       multiple
                       value-key="id">
              <el-option v-for="t in tags" :key="t.id" :label="t.name" :value="t"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import {getAllCategories} from "@/api/category";
import {getAllTags} from "@/api/tag";

export default {
  name: "DocSearchBar",
  data() {
    return {
      categories: [

      ],
      tags: [

      ],
      searchForm: {
        title: '',
        category: '',
        tags: [],
      },
      rules: {
        title : [

        ],
        category: [

        ],
        tags: [

        ]
      }
    }
  },
  methods: {
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
    onSearch(searchForm) {
      this.$refs[searchForm].validate((valid) => {
        if (valid) {
          this.$emit("search", this.searchForm)
        }
      })
    }
  },
  // 页面加载完毕时，读取现有的分类、标签信息
  mounted() {
    this.getAllCategories()
    this.getAllTags()
  }
}
</script>

<style scoped>
  .category-form-item {

  }
  .tags-form-item {

  }

</style>
