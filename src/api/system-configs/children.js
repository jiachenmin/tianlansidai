import axios from '@/libs/api.request'
import Api from '@/api/base/api-config.js'
export const getChildren = (params) => {
  return axios.req({
    params,
    method: 'get',
    url: Api.children.getChildren
  })
}
