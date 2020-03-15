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
            <i-col span="10">
              <h3>{{name}}</h3>
            </i-col>
          </div>
          <Divider />
          <Table :columns="columns1" border :data="resourceDate">
          </Table>
          <Page :current="pageInfo.page" :pageSize="pageInfo.size" :total="pageInfo.total" @on-change="onPageChange" on-page-size-change="onPageSizeChange" show-sizer show-total/>
        </Card>
      </i-col>
    </Row>
  </div>
</template>
<script>
import {
  getDataCenter, getResourceList
} from '@/api/system-configs/data-center.js'

export default {
  created () {
    this.doGetResourceDate()
  },
  // updated(){
  //   this.getkey();
  // },
  data () {
    return {
      name: '',
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
          key: 'caozuo'
        }
      ],
      pageInfo: {
        page: 1,
        size: 10,
        total: 0
      },
      resourceDate: [],
      curryTypeId: ''
    //   typeId:'5c9c3339ab84d455fc483b82'
    }
  },
  methods: {
    async doGetResourceDate () {
      const result = await getDataCenter()
      const { data } = result.data
      console.log(data)
      this.resourceTree = data.map((elm, index) => {
        const params = {
          id: elm._id,
          title: elm.name,
          selected: false
        }
        console.log(elm)
        if (!index) {
          params.selected = true
        //   this.doGetResource({
        //     pageNum: this.pageInfo.page,
        //     pageSize: this.pageInfo.size,
        //     typeId: params.id

        //   })
        this.getAtherData(null, params)
this.name='' //这有问题
        this.name = params.title

}
        return params

      })
    },
    getAtherData (selArr, selNode) {
      this.curryTypeId = selNode.id
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
      console.log(size)
      this.doGetResource({
        pageNum: this.pageInfo.page,
        pageSize: size,
        typeId: this.curryTypeId
      })
    },
    async doGetResource (params) {
      const result = await getResourceList(params)
      const { data } = result.data
      this.resourceDate = data.list
      this.pageInfo.total = data.total

},
// DogetDataCenter() {
//       getDataCenter().then(res => {
//         if (res.success) {
//           var result = res.data;
//           console.log(result);
//           this.data1 = result.data;
//           var params = {
//             typeId: this.typeId,
//             // keyWord: '',
//             pageNum: 1,
//             pageSize: 10
//           };
//           console.log(params.typeId);
//           getResourceList(params).then(res => {
//             if (res.success) {
//               console.log(res);
//               var result = res.data;
//               console.log(result);
//               this.data2 = result.data.list;
//             }
//           });
//         }
//       });
//     },
//     getkey(e,k){
// // console.log(k)
// var params={
//   typeId:k,
//   pageNum:1,
//   pageSize:10
// }
// this.typeId='';
// this.typeId=params.typeId;
// console.log(params.typeId)
// this.DogetDataCenter();
//     }
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
</style>
