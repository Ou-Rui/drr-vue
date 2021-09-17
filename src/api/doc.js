import request from '@/request'
import Qs from "qs"

/**
 * 按照ID获取文章
 * @param id
 * @returns {*}
 */
export function getDocById(id) {
  return request({
    url: '/doc/get',
    method: 'get',
    params: {
      id:id
    }
  });
}

/**
 * 根据筛选条件，获取指定数量的文章
 * @param filter  筛选条件
 */
export function getDocsByFilter(filter) {
  return request({
    url: '/doc/filter',
    method: 'get',
    params: {
      categoryId: filter.categoryId,
      tagIds: filter.tagIds,
      num: filter.num,
      offset: filter.offset,
    },
    paramsSerializer: function (params) {
      return Qs.stringify(params, {arrayFormat: 'repeat'})
    }
  });
}

/**
 * 发布一篇新文章
 * @param doc 新文章的信息表单
 * @returns {*}
 */
export function publishNewDoc(doc) {
  return request({
    url: '/doc/new',
    method: 'post',
    data: doc
  })
}



