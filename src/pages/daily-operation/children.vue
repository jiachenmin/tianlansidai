<template>
    <Table height="800" :columns="columns1" :data="data2"></Table>
</template>
<script>
import { getChildren } from '@/api/system-configs/children.js'
    export default {
      created(){
        this.doGetUserOrgTree();
      },
        data () {
            return {
                columns1: [
                    {
                        title: '#',
                        key: 'index'
                    },
                    {
                        title: '学生姓名',
                        key: 'name'
                    },
                    {
                        title: '性别',
                        key: 'address'
                    },
                   {
                        title: '学生编号',
                        key: 'index'
                    },
                     {
                        title: '学校名称',
                        key: 'index'
                    },
                     {
                        title: '所在城市',
                        key: 'index'
                    },
                     {
                        title: '生日',
                        key: 'index'
                    },
                     {
                        title: '操作',
                        key: 'index'
                    },
                ],
                data2: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    },
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ]
            }
        },
        methods: {
doGetUserOrgTree(){
  getChildren().then(res=>{
 if(res.success){
console.log(res)
 }
  })
}
        },
    }
</script>
