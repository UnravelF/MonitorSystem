<template>
  <div class="wrapper full-height">
    <el-row class="flex-wrap full-height" :gutter="40">
      <el-col :md="8">
        <div class="left full-height"></div>
      </el-col>
      <el-col :md="8">
        <el-form
          :model="userInfo"
          status-icon
          :rules="rules"
          ref="loginForm"
          label-width="100px"
          class="login-form"
          label-position="top">
          <div class="login-title">SIGN IN</div>
          <el-form-item label="用户名" prop="userName">
            <el-input type="text" v-model="userInfo.userName"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="userInfo.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login-btn" @click="loginclick">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :md="8"></el-col>
    </el-row>
  </div>
</template>

<script>
  import {login} from './../network/login'


import rules from "@/config/rules";
import Auth from "@/auth";
// 模拟用户数据 仅作测试使用
import User from "@/json/user";
export default {
  data() {
    return {
      userInfo: {
        userName: "",
        password: ""
      },
      rules: rules.loginRules,
      // 记录登录返回状态
      loginStatus: ""
    }
  },
  methods: {
    loginclick() {
      if(this.userInfo.userName && this.userInfo.password) {
        // 发送登录请求
        login(this.userInfo.userName, this.userInfo.password).then(res => {
          console.log(res);
          // 存储登录返回的Token
          Auth.setToken(res.data);
          // 记录登录状态
          this.loginStatus = res.status
          // 对请求结果进行判断
          // 登录成功
          if(this.loginStatus) {
            if(this.loginStatus === 100) {
              this.$router.push({ path: "/" });
            } else {
              this.$message('用户名或密码错误')
            }
          }
        })
      }else {
        this.$message('未输入用户名或密码');
      }
    }
  }
};
</script>

<style scoped lang="scss" type="text/css">
.wrapper {
  overflow: hidden;
  .left {
    background: url("../assets/images/login_bg.png") no-repeat;
    height: 100%;
    background-size: cover;
    background-position: center;
  }
  width: 100%;
  .login-form {
    width: 90%;
    margin: auto;
    margin-top: 30%;
    margin-right: 0;
    .el-input__inner {
      height: 50px;
    }
    .login-title {
      font-size: 30px;
      text-align: center;
      margin-bottom: 60px;
    }
    .login-item {
      font-size: 16px;
    }
    .login-btn {
      width: 100%;
      margin-top: 40px;
      padding: 18px 0;
      box-shadow: 0 3px 10px 0 rgba(64, 158, 255, 0.75);
    }
  }
}
</style>
