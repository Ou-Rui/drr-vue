import request from '@/request'

export function publishDoc(doc) {
  return request({
    url: '/doc/new',
    method: 'post',
    data: doc
  })
}



