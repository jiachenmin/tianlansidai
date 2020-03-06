import axios from '@/libs/api.request'
import Api from '@/api/base/api-config.js'

export const getUserOrgTree = () => {
  return axios.req({
    method: 'get',
    url: Api.userCenter.getUserOrgTree,
    headers: { testHeader: 'test' }
  })
}
