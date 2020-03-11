import axios from '@/libs/api.request'
import Api from '@/api/base/api-config.js'
export const getDataCenter = () => {
  return axios.req({
    method: 'get',
    url: Api.dataCenter.getDataCenter
  })
}

export const getResourceList = (params) => {
  return axios.req({
    params,
    method: 'get',
    url: Api.dataCenter.getResourceList
  })
}
