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

          <ul class="date-list">
            <li v-for="(item,index) in data1" :key="item._id">
              <router-link to>
                <Button type="text" ghost>{{item.name}}</Button>
              </router-link>
            </li>
          </ul>
        </Card>
      </i-col>
      <i-col span="18" class-name="right-box">
        <Card>
          <Table height="800" :columns="columns1" :data="data2">
            <Button type="error">Error</Button>
          </Table>
        </Card>
      </i-col>
    </Row>
  </div>
</template>
<script>
import {
  getDataCenter,
  getResourceList
} from "@/api/system-configs/data-center.js";

export default {
  created() {
    this.DogetDataCenter();
  },
  data() {
    return {
      // name:'',
      data1: [],
      columns1: [
        {
          title: "#",
          key: ""
        },
        {
          title: "编号",
          key: "number"
        },
        {
          title: "名称",
          key: "name"
        },
        {
          title: "备注",
          key: "memo"
        },
        {
          title: "操作",
          key: "caozuo"
        }
      ],
      data2: []
    };
  },
  methods: {
    DogetDataCenter() {
      getDataCenter().then(res => {
        if (res.success) {
          var result = res.data;
          console.log(result);
          this.data1 = result.data;
          const params = {
            typeId: this.data1[0]._id,
            // keyWord: '',
            pageNum: 1,
            pageSize: 10
          };
          console.log(params.typeId);
          getResourceList(params).then(res => {
            if (res.success) {
              console.log(res);
              var result = res.data;
              console.log(result);
              this.data2 = result.data.list;
            }
          });
        }
      });
    }
  }
};
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
