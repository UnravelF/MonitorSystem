<template>
  <div class="staff-form">
    <div class="form-message">
      <el-form :model="staffinfo" :rules="rules" ref="deviceinfo" label-width="100px" class="demo-ruleForm">
        <h3>添加人员信息</h3>
        <div class="staff">
          <el-form-item label="用户名：" prop="userName">
            <el-input type="text" v-model="staffinfo.userName"></el-input>
          </el-form-item>
        </div>
        <div class="staff">
          <el-form-item label="密码：" prop="password">
            <el-input type="text" v-model="staffinfo.password"></el-input>
          </el-form-item>
        </div>
        <div class="staff">
          <el-form-item label="昵称：" prop="nickName">
            <el-input type="text" v-model="staffinfo.nickName"></el-input>
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
        <div class="staff">
          <el-form-item label="角色：" prop="roleValue">
            <el-select class="choose" v-model="staffinfo.roleValue" placeholder="请选择" @visible-change="getRole">
              <el-option
                  v-for="item in staffinfo.role"
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
  import {getRoleList, addStaff} from '../../network/staff'

  export default {
    name: "addStaff",
    data() {
      return {
        staffinfo: {
          userName: "",
          password: "",
          nickName: "",
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
          sexValue: '',
          // 角色选择
          role: [],
          roleValue: '',
        },
        // 验证规则
        rules: {
          userName: [
            { required: true, message: '用户名不能为空', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '用户密码不能为空', trigger: 'blur' }
          ],
          roleValue: [
            { required: true, message: '角色选择不能为空', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      // 获取角色数据
      getRole() {
        getRoleList().then(res => {
          console.log(res);
          this.staffinfo.role = res.data
        })
      },
      // 新建人员
      addStaffData(userName, password, nickName, email, phone, sex, roleId) {
        addStaff(userName, password, nickName, email, phone, sex, roleId).then(res => {
          console.log(res);
          // 对请求结果进行判断
          if(res.status === 100) {
            this.$message({
              showClose: true,
              message: '恭喜你，新建人员成功',
              type: 'success'
            });
          } else {
            this.$message({
              showClose: true,
              message: '发生未知，新建人员失败',
              type: 'error'
            });
          }
          
        })
      },
       buildClick() {
        this.$emit('buildClick')
        // 提交新建人员请求
        this.addStaffData(this.staffinfo.userName, this.staffinfo.password, this.staffinfo.nickName, this.staffinfo.email, this.staffinfo.phone, this.staffinfo.sexValue, this.staffinfo.roleValue)
      },
      cancelClick() {
        this.$emit('cancelClick')
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
    height: 600px;
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
