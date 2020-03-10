import axios from '@/libs/api.request'
import Api from '@/api/base/api-config.js'
export const getChildren = () => {
  return axios.req({
    state: true,
    method: 'get',
    url: Api.children.getChildren,
    keyWord: '',
    pageNum: 1,
    pageSize: 10
  })
}
