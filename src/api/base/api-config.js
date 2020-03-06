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
  // ------ user center --------
  userCenter: {
    getUserOrgTree: (M_BASE_PATH.concat('user/tree')) // 获取用户组织树
  }
}

export default merge(baseApi, Api.api)