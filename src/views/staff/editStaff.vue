<template>
  <div class="staff-form">
    <div class="form-message">
      <el-form :model="staffinfo" :rules="rules" ref="deviceinfo" label-width="100px" class="demo-ruleForm">
        <h3>修改用户信息</h3>
        <div class="staff">
          <el-form-item label="昵称：" prop="nickName">
            <el-input type="text" v-model="staffinfo.nickName"></el-input>
          </el-form-item>
        </div>
        <div class="staff">
          <el-form-item label="密码：" prop="password">
            <el-input type="text" v-model="staffinfo.password"></el-input>
          </el-form-item>
        </div>
        <div class="staff">
          <el-form-item label="email：" prop="email">
            <el-input type="text" v-model="staffinfo.email"></el-input>
          </el-form-item>
        </div>
        <div class="staff">
          <el-form-item label="电话：" prop="phone">
            <el-input type="text" v-model="staffinfo.phone"></el-input>
          </el-form-item>
        </div>
        <div class="staff">
          <el-form-item label="性别：" prop="sexValue">
            <el-select class="choose" v-model="staffinfo.sexValue" placeholder="请选择">
              <el-option
                  v-for="item in staffinfo.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
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
  import {updateUser} from '../../network/staff'

  export default {
    name: "editStaff",
    data() {
      return {
        staffinfo: {
          nickName: "",
          password: "",
          email: "",
          phone: "",
          options: [{
            value: '1',
            label: '男'
          }, {
            value: '2',
            label: '女'
          },{
            value: '3',
            label: '保密'
          }],
          sexValue: ''
        },
        // 验证规则
        rules: {
          password: [
            { required: true, message: '用户密码不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
       buildClick() {
        this.$emit('editStaff')
      },
      cancelClick() {
        this.$emit('cancelEdit')
      }
    }
  }
</script>

<style scoped>
  .staff-form {
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
    height: 450px;
    text-align: center;
    border-radius: 10px;
  }

  .staff {
    margin: 20px 30px;
    font-size: 18px;
  }

  .staff input {
    width: 294px;
    height: 36px;
    outline: none;
    font-size: 16px;
    vertical-align: middle;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
  }
  .selcetion {
    float: left;
  }

  .select {
    display: inline-block;

  }

  .btn button{
    margin: 0 10px;
  }

  .choose {
    width: 300px;
  }

</style>
