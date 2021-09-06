import request from '@/request'


/**
 * 发布一个新标签
 * @param tag 新标签的信息表单
 * @returns {*}
 */
export function publishNewTag(tag) {
  return request({
    url: '/tag/new',
    method: 'post',
    data: tag,
  });
}

export function getAllTags() {
  return request({
    url: '/tag/all',
    method: 'get',
  })
}


