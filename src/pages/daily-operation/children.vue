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
                        key: ''
                    },
                    {
                        title: '学生姓名',
                        key: 'name'
                    },
                    {
                        title: '性别',
                        key: 'sex'
                    },
                   {
                        title: '学生编号',
                        key: 'identityCode'
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
                        key: 'birthTime'
                    },
                     {
                        title: '操作',
                        key: 'index'
                    },
                ],
                data2: [

                ]
            }
        },
        methods: {
doGetUserOrgTree(){
  getChildren().then(res=>{
 if(res.success){
   var result=res.data;
console.log(result);
this.data2=result.data.list;
 }
  })
}
        },
    }
</script>
