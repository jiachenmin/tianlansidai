<template>
  <div class="wrapper">
    <Row :gutter="10" class-name="user-center">
      <i-col span="6" class-name="left-box">
        <Card>
          <div class="title">
            <i-col span="8">
              <h3>角色树</h3>
            </i-col>
            <i-col span="8" offset="8">
              <Button type="success" class="pull-right" icon="md-add-circle" size="small" @click="modal1=true">
                建角色
              </Button>
            </i-col>
          </div>
          <Divider />
          <div class="org-tree">
            <Tree class="org-list" :data="roleTree">
                <Button :size="buttonSize" icon="ios-download-outline" type="primary" shape="circle"></Button>
            </Tree>
          </div>
        </Card>
      </i-col>
      <i-col span="18" class-name="right-box">
        <Card>
           <div class="title">
            <i-col span="13">
              <h3>{{name}}</h3>
            </i-col>
             <i-col span="8">
              <Input search enter-button="搜索" placeholder="请输入你要搜索的内容..." v-model="keyWord" @on-search="getSearchdata"/>
            </i-col>
            <i-col>
               <Button type="success" @click="modal2 = true">添加</Button>
            </i-col>
          </div>
          <Divider />
          <Table :columns="columns1" border :data="rolesList">
          </Table>
          <Page :current="pageInfo.page" :pageSize="pageInfo.size" :total="pageInfo.total" @on-change="onPageChange" on-page-size-change="onPageSizeChange(size)" show-total/>
        </Card>
      </i-col>
    </Row>
     <Modal
        v-model="modal1"
        title="Common Modal dialog box title"
        @on-ok="doCreateRole">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem label="名称" prop="name">
        <Input v-model="formValidate.name" placeholder="请输入名称"></Input>
      </FormItem>
      <FormItem label="编号" prop="mail">
        <Input v-model="formValidate.mail" placeholder="请输入英文编号"></Input>
      </FormItem>
      <FormItem label="备注" prop="desc">
        <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注"></Input>
      </FormItem>
   </Form>
    </Modal>
  </div>
</template>
<script>
import { getRole, createRole, getPermissionList } from '@/api/system-configs/power-center.js'
export default {
  created () {
    this.doGetRole()
  },
  data () {
    return {
      roleTree: [],
      rolesList: [],
      modal1: false,
      curryTypeId: '',
      name: '',
      keyWord: '',
      formValidate: {
        name: '',
        mail: '',
        desc: ''
      },
      pageInfo: {
        page: 1,
        size: 10,
        total: 0
      },
      ruleValidate: {
        name: [
          { required: true, message: '资源名称为必填项', trigger: 'blur'}
        ],
        mail: [
          { required: true, message: '编号为6-20位字符', trigger: 'blur' },
          { pattern: '^[0-9a-zA-Z]{6,20}$', message: '请输入英文或数字编号' }

        ],
        desc: [
          { required: false, message: 'Please enter a personal introduction', trigger: 'blur' }
        ]
      },
      columns1: [
        {
          title: '#',
          type: 'index'
        },
        {
          title: '状态',
          key: 'status'
        },
        {
          title: '资源类型',
          key: 'name'
        },
        {
          title: '资源编号',
          key: 'number'
        },
        {
          title: '名称',
          key: 'name'
        },
        {
          title: '权限',
          key: 'action'
        }
      ]
    }
  },
  methods: {
    async doGetRole () {
      const result = await getRole()
      const { data } = result.data
      this.roleTree = data.map((elm, index) => {
        const params = {
          title: elm.name,
          id: elm._id,
          selected: false
        }
        if (!index) {
          params.selected = true
          this.getAtherData(null, params)
        }
        return params
      })
    },
    async doCreateRole () {
      await createRole({
        name: this.formValidate.name,
        number: this.formValidate.mail,
        memo: this.formValidate.desc
      })
      this.doGetRole()
      this.formValidate.name = ''
      this.formValidate.mail = ''
      this.formValidate.desc = ''
    },
    getAtherData (selArr, selNode) {
      this.curryTypeId = selNode.id
      // console.log(this.curryTypeId)
      this.name = selNode.title
      this.doGetPermissionList({
        roleId: this.curryTypeId,
        pageNum: this.pageInfo.page,
        pageSize: this.pageInfo.size
      })
    },
    async doGetPermissionList (params) {
      const result = await getPermissionList(params)
      const { data } = result.data
      this.rolesList = data.list.map((elm, index) => {
        const params = {
          roles: elm.resource
        }
        // console.log(params)
        return params
      })
      console.log(this.rolesList)
      this.pageInfo.total = data.total
    },
    async getSearchdata () {

    },
    onPageChange (page) {
      this.pageInfo.page = page
      console.log(page)
      // debugger
      this.doGetResource({
        pageNum: page,
        pageSize: this.pageInfo.size,
        typeId: this.curryTypeId
      })
    },
    onPageSizeChange (size) {
      this.pageInfo.size = size
      console.log(size)
      this.doGetResource({
        pageNum: this.pageInfo.page,
        pageSize: size,
        typeId: this.curryTypeId
      })
    }
  }
}
</script>
<style lang="less" scoped>
.user-center {
  .title {
    padding-bottom: 15px;
  }
  .left-box,.right-box {
    .ivu-card{
      min-height: 600px;
    }
  }
  .org-list {
    ul li {
      .ivu-tree-title {
        padding: 0 8px;
      }
      line-height: 26px;
      font-size: 14px;
    }
    li ul {
      padding: 0
    }
  }
}
</style>
