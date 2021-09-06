import request from '@/request'

export function getAllTags() {
  return request({
    url: '/tag/all',
    method: 'get',
  })
}


