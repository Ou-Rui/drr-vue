import request from '@/request'

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
