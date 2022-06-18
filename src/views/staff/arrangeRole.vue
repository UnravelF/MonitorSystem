<template>
  <div class="role-form">
    <div class="form-message">
      <el-form :model="User" ref="User" label-width="100px" class="demo-ruleForm">
        <h3>职位选择</h3>
        <div class="role">
          <el-form-item label="职位：" prop="roleValue">
            <el-select class="choose" v-model="User.roleValue" placeholder="请选择" id="roleType" @visible-change="getRole">
              <el-option
                  v-for="item in Role"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="btn">
          <button @click="buildClick">确定</button>
          <button @click="cancelClick">取消</button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {getRole, updateRole} from '../../network/staff'

  export default {
    name: "arrangeRole",
    props: {
      uid: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        // 存储描述信息
        description: "",
        // 职位类型选择
        Role: [],
        User: {
          // 存储职位类型
          roleValue: '',
          // 点击的用户id
          userValue: '',
        } 
      }
    },
    methods: {
      // 获取职位列表
      getRole() {
        // 获取请求
        getRole().then(res => {
          // 获取职位列表
          this.Role = res.data
        })
      },
      // 更新职位请求
      updateUserRole(uid, rid) {
        updateRole(uid, rid).then(res => {
          console.log(res);
        })
      },
      buildClick() {
        this.$emit('buildClick')
        this.User.userValue = this.uid
        console.log(this.rid);
        // 发送更新职位请求
        this.updateUserRole(this.User.userValue, this.User.roleValue)
      },
      cancelClick() {
        this.$emit('cancelClick')
      }
    }
  }
</script>

<style scoped>
  .role-form {
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
    height: 200px;
    text-align: center;
    border-radius: 10px;
  }

  .role {
    margin: 20px 50px;
    font-size: 18px;
  }

  .btn button{
    margin: 0 10px;
  }

  .choose {
    width: 300px;
  }

</style>
