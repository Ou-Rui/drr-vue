import request from '@/request'

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



