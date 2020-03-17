<template>
  <div class="wrapper">
    <Row :gutter="10" class-name="user-center">
      <i-col span="6" class-name="left-box">
        <Card>
          <div class="title">
            <i-col span="10">
              <h3>资源类型树</h3>
            </i-col>
          </div>
          <Divider />

         <Tree :data="resourceTree" @on-select-change="getAtherData"></Tree>
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
               <Button type="success" @click="modal1 = true">添加</Button>
            <Modal
                v-model="modal1"
                title="添加资源"
                @on-ok="ok"
                @on-cancel="cancel">
                 <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="名称" prop="name" disabled="true">
            <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
        </FormItem>
        <FormItem label="编号" prop="mail">
            <Input v-model="formValidate.mail" placeholder="Enter your e-mail"></Input>
        </FormItem>
                <FormItem label="备注" prop="desc">
            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
        </FormItem>
    </Form>
            </Modal>
            </i-col>
          </div>
          <Divider />
          <Table :columns="columns1" border :data="resourceDate">
              <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px">查看</Button>
             <Poptip
        confirm
        title="您确定删除这条内容吗？"
        @on-ok="doDeleteResource"
        transfer>
        <Button type="error" size="small">删除</Button>
    </Poptip>
        </template>
          </Table>
          <Page :current="pageInfo.page" :pageSize="pageInfo.size" :total="pageInfo.total" @on-change="onPageChange" on-page-size-change="onPageSizeChange" show-sizer show-total/>
        </Card>
      </i-col>
    </Row>
  </div>
</template>
<script>
import {
  getDataCenter, getResourceList, deleteResource, getSearch
} from '@/api/system-configs/data-center.js'

export default {
  created () {
    this.doGetResourceDate()
  },
  data () {
    return {
      name: '',
      keyWord: '',
      formValidate: {
        name: '',
        mail: '',
        desc: ''
      },
      ruleValidate: {
                    name: [
                        { required: true, message: '请输入名称', trigger: 'blur'}
                    ],
                    mail: [
                        { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' }
                        // { type: 'text', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                      desc: [
                        { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
                        { type: 'string', message: 'Introduce no less than 20 words', trigger: 'blur' }
                    ]
                },
      resourceTree: [],
      columns1: [
        {
          title: '#',
          type: 'index'
        },
        {
          title: '编号',
          key: 'number'
        },
        {
          title: '名称',
          key: 'name'
        },
        {
          title: '备注',
          key: 'memo'
        },
        {
          title: '操作',
          slot: 'action'
        }
      ],
      pageInfo: {
        page: 1,
        size: 10,
        total: 0
      },
      resourceDate: [],
      curryTypeId: '',
      modal1: false
    }
  },
  methods: {
     ok () {
                this.$Message.info('Clicked ok');
            },
            cancel () {
                this.$Message.info('Clicked cancel');
            },
    async doGetResourceDate () {
      const result = await getDataCenter()
      const { data } = result.data
      // console.log(data)
      this.resourceTree = data.map((elm, index) => {
        const params = {
          id: elm._id,
          title: elm.name,
          selected: false
        }
        // console.log(params.id)
        if (!index) {
          params.selected = true
          this.getAtherData(null, params)
        }
        return params
      })
    },
    getAtherData (selArr, selNode) {
      this.curryTypeId = selNode.id
      // console.log(this.curryTypeId)
      this.name = selNode.title
      this.doGetResource({
        pageNum: this.pageInfo.page,
        pageSize: this.pageInfo.size,
        typeId: this.curryTypeId
      })
    },
    onPageChange (page) {
      this.pageInfo.page = page
      console.log(page)
      debugger
      this.doGetResource({
        pageNum: page,
        pageSize: this.pageInfo.size,
        typeId: this.curryTypeId
      })
    },
    onPageSizeChange (size) {
      this.pageInfo.size = size
      // console.log(size)
      this.doGetResource({
        pageNum: this.pageInfo.page,
        pageSize: size,
        typeId: this.curryTypeId
      })
    },
    async doDeleteResource () {
      const result = await getResourceList({
        pageNum: this.pageInfo.page,
        pageSize: this.pageInfo.size,
        typeId: this.curryTypeId
      })
      const { data } = result.data
      // console.log(data)
      this.resourceDate = data.list
      this.resourceDate.map((elm,index) => {
        const params = {
          id: elm._id
        }
        if (!index) {
          deleteResource(params.id) // 有bug
        }
        return params
      })
    },
    async getSearchdata () {
      if (this.keyWord === '') {
        this.doGetResource({
          pageNum: this.pageInfo.page,
          pageSize: this.pageInfo.size,
          typeId: this.curryTypeId
        })
      } else {
        const result = await getSearch({
          pageNum: this.pageInfo.page,
          pageSize: this.pageInfo.size,
          typeId: this.curryTypeId,
          keyWord: this.keyWord
        })
        const { data } = result.data
        this.resourceDate = data.list
      }
    },
    async doGetResource (params) {
      const result = await getResourceList(params)
      const { data } = result.data
      this.resourceDate = data.list
      this.pageInfo.total = data.total
    }
  }
}
</script>
<style lang="less" scoped>
.left-box,
.right-box {
  .ivu-card {
    min-height: 600px;
  }
}
a {
  color: #515a6e;
}
.date-list {
  margin: 10px auto;
  list-style: none;

  .ivu-btn-ghost {
    color: #515a6e;
    font-size: 13px;
  }
}
.ivu-btn-success{
  margin-left:5px;
}
</style>
