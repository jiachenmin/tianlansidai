import axios from '@/libs/api.request'
import Api from '@/api/base/api-config.js'
export const getDataCenter = () => {
  return axios.req({
    method: 'get',
    url: Api.dataCenter.getDataCenter,
    headers: { testHeader: 'test' }
  })
}
