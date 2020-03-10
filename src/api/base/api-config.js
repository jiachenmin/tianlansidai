import Api from '^'

const merge = require('webpack-merge')

const M_BASE_PATH = Api.path.base

const baseApi = {
  getSidebarNavMenuOfConfig: ('/static/configs/sidebar-menu.json'),
  getSideBarMenu: (M_BASE_PATH.concat('navigation/all')),
  echartsConfig: ('/static/mock-data/walden.project.json'),
  user: {
    login: (M_BASE_PATH.concat('user/login'))
  },
  children: {
    getChildren: (M_BASE_PATH.concat('child'))
  },
  // ------ user center --------
  userCenter: {
    getUserOrgTree: (M_BASE_PATH.concat('user/tree')) // 获取用户组织树
  },
  dataCenter: {
    getDataCenter: (M_BASE_PATH.concat('resource/type'))
  }
}

export default merge(baseApi, Api.api)
