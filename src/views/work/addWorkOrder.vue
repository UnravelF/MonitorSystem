<template>
  <div class="work-form">
    <div class="form-message">
      <h3>新建工单</h3>
      <div class="work">
        <label for="workType" class="select">工单类型：</label>
        <el-select class="choose" v-model="workType" placeholder="请选择" id="workType">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="work">
        <label for="role" class="select">工程师：</label>
        <el-select class="choose" v-model="roleValue" placeholder="请选择" @visible-change="getEngineer">
          <el-option
              v-for="item in engineers"
              :key="item.id"
              :label="item.userName"
              :value="item.id">
              <span style="float: left">{{ item.userName }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.nickName }}</span>
          </el-option>
        </el-select>
      </div>
      <div class="work">
        <label for="textarea">描述：</label>
        <el-input
              id="textarea"
              class="textarea"
              type="textarea"
              placeholder="请输入内容"
              v-model="description"
              maxlength="100"
              show-word-limit>
        </el-input>
      </div>
      <div class="btn">
        <button @click="buildClick">新建</button>
        <button @click="cancelClick">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {getUserByRole, WorkOrder} from '../../network/work'

  export default {
    name: "addStaff",
    data() {
      return {
        // 存储描述信息
        description: "",
        // 工单类型选择
        options: [{
          value: '1',
          label: '安装设备'
        }, {
          value: '2',
          label: '维修设备'
        }],
        // 存储工单类型
        workType: '',
        // 角色选择
        engineers: [],
        // 存储负责该新建工单的工程师
        roleValue: ''
      }
    },
    methods: {
      // 获取所有工程师
      getEngineer() {
        getUserByRole(2).then(res => {
          console.log(res);
          this.engineers = res.data
          console.log(this.engineers);
        })
      },
      // 新建工单
      addWorkOrder(type, description, userId) {
        WorkOrder(type, description, userId).then(res => {
          console.log(res);
          // 对请求结果进行判断
          if(res.status === 100) {
            this.$message({
              showClose: true,
              message: '新建工单成功',
              type: 'success'
            })
            // 页面重定向
            setTimeout(function(){
              location.reload()
            },1000)
          } else {
            this.$message({
              showClose: true,
              message: ' 发生未知错误, 新建工单失败',
              type: 'error'
            })
          }
        })
      },
      buildClick() {
        this.$emit('buildClick')
        // 发送新建工单请求
        this.addWorkOrder(this.workType, this.description, this.roleValue)
      },
      cancelClick() {
        this.$emit('cancelClick')
      },
    }
  }
</script>

<style scoped>
  .work-form {
    width: 100%;
    height: 100%;
    background-color: rgba( 0, 0, 0, 0.5);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .form-message {
    background-color: #fff;
    width: 500px;
    height: 350px;
    text-align: center;
    border-radius: 10px;
  }

  .work {
    margin: 20px 0;
    font-size: 18px;
  }
  
  .work label {
    display: inline-block;
    width: 100px;
    height: 30px;
    color: #606266;
    text-align: right;
    font-size: 16px;
  }

  .work .textarea {
    width: 300px;
  }

  .btn button{
    margin: 0 10px;
  }

  .choose {
    width: 300px;
  }

</style>
