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

          <Tree :data="data1"></Tree>
        </Card>
      </i-col>
      <i-col span="18" class-name="right-box">
        <Card></Card>
      </i-col>
    </Row>
  </div>
</template>
<script>
import { getDataCenter } from '@/api/system-configs/data-center.js'
    export default {
           created(){
this.DogetDataCenter()
           },
        data () {
            return {
                data1: [

                ]
            }
        },
        methods: {
          DogetDataCenter(){
            getDataCenter().then(res=>{
              if(res.success){
console.log(res)
              }
            })
          }
        },
    }
</script>
