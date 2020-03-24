import axios from '@/libs/api.request'
import Api from '@/api/base/api-config.js'
export const createRole = (params) => {
  return axios.req({
    data: params,
    method: 'post',
    url: Api.powerCenter.createRole
  })
}
export const getRole = () => {
  return axios.req({
    // params,
    method: 'get',
    url: Api.powerCenter.getRole
  })
}
export const getPermissionList = (params) => {
  return axios.req({
    params,
    method: 'get',
    url: Api.powerCenter.getPermissionList
  })
}
