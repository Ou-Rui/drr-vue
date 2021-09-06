import request from '@/request'


/**
 * 发布一个新分类
 * @param category 新分类的信息表单
 * @returns {*}
 */
export function publishNewCategory(category) {
  return request({
    url: '/category/new',
    method: 'post',
    data: category,
  });
}

/**
 * 获取所有分类信息
 * @returns List<CategoryVo>
 *   id
 *   name
 *   avatar
 *   description
 *   createTime
 *   docNum
 */
export function getAllCategories() {
  return request({
    url: '/category/all',
    method: 'get',
  })
}



